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
  name: String.withConstraint((s) => s.length <= 50),
  description: String.withConstraint((s) => s.length <= 500),
  links: Array(String),
  position: Array(Number).withConstraint<LatLng>((a) => a.length === 2),
});

export async function handlePOSTPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    Body.check(req.body)
    res.sendStatus(400);
    return;
  }

  const place = await createPlace({
    ...req.body,
    world: req.params.worldSlug,
    verified: false,
  });

  res.status(200).json(place);
}
