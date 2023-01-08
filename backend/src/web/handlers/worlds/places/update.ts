import { Request, Response } from "express";
import { Array, Boolean, Number, Record, String } from "runtypes";
import { worlds, WorldSlug } from "zwift-data";
import {
  Place,
  readPlace,
  writePlace
} from "../../../../shared/persistence/place.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser
} from "../../../../shared/services/strava/index.js";
import { LatLng } from "../../../../shared/types.js";
import { Session } from "../../../types.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
  placeId: String,
});

const Body = Record({
  name: String.withConstraint((s) => s.length <= 50),
  description: String.withConstraint((s) => s.length <= 500),
  links: Array(String),
  position: Array(Number).withConstraint<LatLng>((a) => a.length === 2),
  // verified: Boolean,
});

export async function handlePUTPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    Body.check(req.body)
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(401);
    return;
  }

  if (
    !isStravaAdminUser(session.stravaAthleteId) &&
    !isStravaModeratorUser(session.stravaAthleteId)
  ) {
    res.sendStatus(403);
    return;
  }

  const place = await readPlace(req.params.worldSlug, req.params.placeId);
  if (!place) {
    res.sendStatus(404);
    return;
  }

  const updatedPlace: Place = {
    ...place,
    ...req.body,
    id: req.params.placeId,
    world: req.params.worldSlug,
  };
  await writePlace(updatedPlace);

  res.status(200).json(updatedPlace);
}
