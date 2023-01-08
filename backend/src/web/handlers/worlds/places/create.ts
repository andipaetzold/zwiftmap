import { Request, Response } from "express";
import { Array, Number, Record, String } from "runtypes";
import { worlds, WorldSlug } from "zwift-data";
import { createPlace } from "../../../../shared/persistence/place.js";
import { LatLng } from "../../../../shared/types.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
});

const Body = Record({
  name: String,
  position: Array(Number).withConstraint<LatLng>((a) => a.length === 2),
});

export async function handleCreatePlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const place = await createPlace({
    ...req.body,
    world: req.params.worldSlug,
    verified: false,
  });

  res.status(200).header("public, max-age=86400").json(place);
}
