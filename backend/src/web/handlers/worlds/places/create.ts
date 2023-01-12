import { Request, Response } from "express";
import { Array, Number, Record, String } from "runtypes";
import { savePlaceImage } from "../../../../shared/services/gcs.js";
import { worlds, WorldSlug } from "zwift-data";
import {
  createPlace,
  writePlace,
} from "../../../../shared/persistence/place.js";
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
  imageObjectId: String,
});

export async function handlePOSTPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    Body.check(req.body);
    res.sendStatus(400);
    return;
  }

  let place = await createPlace({
    ...req.body,
    world: req.params.worldSlug,
    verified: false,
  });

  const imageUrl = await savePlaceImage(req.body.imageObjectId, place.id);
  place = await writePlace({
    ...place,
    image: imageUrl,
  });

  res.status(200).json(place);
}
