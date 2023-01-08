import { Request, Response } from "express";
import { Array, Number, Record, String } from "runtypes";
import { Session } from "../../../types.js";
import { worlds, WorldSlug } from "zwift-data";
import {
  Place,
  readPlace,
  writePlace,
} from "../../../../shared/persistence/place.js";
import { LatLng } from "../../../../shared/types.js";
import { isAdminUser } from "../../../../shared/services/strava/index.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
  placeId: String,
});

const Body = Record({
  name: String,
  position: Array(Number).withConstraint<LatLng>((a) => a.length === 2),
});

export async function handlePUTPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(401);
    return;
  }

  if (!isAdminUser(session.stravaAthleteId)) {
    res.sendStatus(403);
    return;
  }

  const place = await readPlace(req.params.worldSlug, req.params.placeId);
  if (!place) {
    res.sendStatus(404);
    return;
  }

  // TODO: check admin

  const updatedPlace: Place = {
    ...place,
    id: req.params.placeId,
    world: req.params.worldSlug,
  };
  await writePlace(updatedPlace);

  res.status(200).json(updatedPlace);
}
