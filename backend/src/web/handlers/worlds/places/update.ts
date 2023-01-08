import { Request, Response } from "express";
import { Array, Number, Record, String } from "runtypes";
import { worlds, WorldSlug } from "zwift-data";
import { readPlace, writePlace } from "../../../../shared/persistence/place.js";
import { LatLng } from "../../../../shared/types.js";

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

export async function handleUpdatePlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  // TODO: permissions

  const place = await readPlace(req.params.worldSlug, req.params.placeId);
  if (!place) {
    res.sendStatus(404);
    return;
  }

  const updatedPlace = await writePlace({
    ...place,
    id: req.params.placeId,
    world: req.params.worldSlug,
    verified: false, // TODO: permissions
  });

  res.status(200).header("public, max-age=86400").json(updatedPlace);
}
