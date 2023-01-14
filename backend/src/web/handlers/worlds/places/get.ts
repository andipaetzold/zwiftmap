import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { readPlace } from "../../../../shared/persistence/place.js";
import { worlds, WorldSlug } from "zwift-data";
import { Session } from "../../../../web/types.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser,
} from "../../../../shared/services/strava/index.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
  placeId: String,
});

export async function handleGETPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const place = await readPlace(req.params.worldSlug, req.params.placeId);
  if (!place) {
    res.sendStatus(404);
    return;
  }

  const session = req.session as Session | undefined;
  const canReadUnverified =
    session?.stravaAthleteId !== undefined &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));

  if (!place.verified && !canReadUnverified) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json(place);
}
