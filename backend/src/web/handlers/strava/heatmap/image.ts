import polyline from "@mapbox/polyline";
import { featureCollection, lineString } from "@turf/helpers";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { worlds } from "zwift-data";
import { latLngToPosition } from "../../../../shared/browser/coordinates.js";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/index.js";
import { NumberString } from "../../../../shared/runtypes.js";
import { Session } from "../../../types.js";

const queryRunType = Record({
  size: NumberString,
});

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETPersonalHeatmapImage(
  req: Request,
  res: Response
) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }
  const size = +req.query.size;

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

  res.sendStatus(404);
}
