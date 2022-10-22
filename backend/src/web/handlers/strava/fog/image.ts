import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { worlds } from "zwift-data";
import { createFogImage } from "../../../../shared/image/index.js";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/index.js";
import { NumberString } from "../../../../shared/runtypes.js";
import { calcFogPolygon } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const queryRunType = Record({
  size: NumberString,
});

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETStravaFogImage(req: Request, res: Response) {
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

  const world = worlds.find((w) => w.slug === req.params.worldSlug)!;
  const activities = await readStravaActivitiesByWorld(
    session.stravaAthleteId,
    world.slug
  );
  const fog = calcFogPolygon(world, activities);

  const stream = await createFogImage(world, fog, size);
  res.contentType("png");
  stream.pipe(res);
}
