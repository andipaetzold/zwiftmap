import polyline from "@mapbox/polyline";
import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import { Feature, lineString, MultiPolygon, Polygon } from "@turf/helpers";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { World, worlds } from "zwift-data";
import { latLngToPosition } from "../../../../shared/browser/coordinates.js";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/stravaActivity.js";
import {
  DetailedActivity,
  isStravaBetaUser,
} from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETWorldFogGeoJSON(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  if (!isStravaBetaUser(session.stravaAthleteId)) {
    res.sendStatus(403);
    return;
  }

  const world = worlds.find((w) => w.slug === req.params.worldSlug)!;

  const activities = await readStravaActivitiesByWorld(
    session.stravaAthleteId,
    world.slug
  );
  const fog = calcFog(world, activities);

  res.contentType("application/geo+json").json(fog);
}

const BUFFER_RADIUS = 0.05; // 50 m

function calcFog(world: World, activities: DetailedActivity[]) {
  const boundsPolygon = bboxPolygon([
    world.bounds[0][1] - 1,
    world.bounds[0][0] + 1,
    world.bounds[1][1] + 1,
    world.bounds[1][0] - 1,
  ]);

  return activities
    .map((activity) => polyline.decode(activity.map.polyline))
    .map((stream) => stream.map(latLngToPosition))
    .map((stream) => lineString(stream))
    .map((line) => buffer(line, BUFFER_RADIUS, { units: "kilometers" }))
    .reduce((prev, cur) => {
      try {
        // Activities can never cover the whole map
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return difference(prev, cur)!;
      } catch (e) {
        return prev;
      }
    }, boundsPolygon as Feature<Polygon | MultiPolygon>);
}
