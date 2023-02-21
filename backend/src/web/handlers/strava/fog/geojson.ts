import { Request, Response } from "express";
import { Record, String } from "runtypes";
import {
  readStravaFog,
  writeStravaFogGeoJSON,
} from "../../../../shared/persistence/stravaFog.js";
import { worlds } from "zwift-data";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/stravaActivity.js";
import { calcFogPolygon } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETStravaFogGeoJSON(req: Request, res: Response) {
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

  const stravaFog = await readStravaFog(stravaAthleteId, world.slug);
  let geoJSON = stravaFog?.geoJSON;
  if (!geoJSON) {
    const activities = await readStravaActivitiesByWorld(
      stravaAthleteId,
      world.slug
    );
    geoJSON = await calcFogPolygon(world, activities);
    await writeStravaFogGeoJSON(stravaAthleteId, world.slug, geoJSON);
  }

  res.contentType("application/geo+json").json(geoJSON);
}
