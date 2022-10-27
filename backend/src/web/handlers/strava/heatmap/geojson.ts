import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/index.js";
import { worlds } from "zwift-data";
import { Session } from "../../../types.js";
import { latLngToPosition } from "../../../../shared/browser/coordinates.js";
import polyline from "@mapbox/polyline";
import { featureCollection, lineString } from "@turf/helpers";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETPersonalHeatmapGeoJSON(
  req: Request,
  res: Response
) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }
  const { stravaAthleteId } = session;

  const world = worlds.find((w) => w.slug === req.params.worldSlug)!;

  const activities = await readStravaActivitiesByWorld(
    stravaAthleteId,
    world.slug
  );

  const lines = activities
    .map((activity) => polyline.decode(activity.map.polyline))
    .map((stream) => stream.map(latLngToPosition))
    .map((stream) => lineString(stream));

  const lineCollection = featureCollection(lines);

  res.contentType("application/geo+json").json(lineCollection);
}
