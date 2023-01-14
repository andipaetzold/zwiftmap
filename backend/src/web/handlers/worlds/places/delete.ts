import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { isStravaAdminUser } from "../../../../shared/services/strava/index.js";
import { worlds, WorldSlug } from "zwift-data";
import {
  readPlace,
  removePlace,
} from "../../../../shared/persistence/place.js";
import { Session } from "../../../types.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
  placeId: String,
});

export async function handleDELETEPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(401);
    return;
  }

  if (!isStravaAdminUser(session.stravaAthleteId)) {
    res.sendStatus(403);
    return;
  }

  const place = await readPlace(req.params.worldSlug, req.params.placeId);
  if (!place) {
    res.sendStatus(404);
    return;
  }

  await removePlace(req.params.worldSlug, req.params.placeId);

  res.sendStatus(204);
}
