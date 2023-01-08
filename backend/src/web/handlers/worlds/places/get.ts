import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { readPlace } from "../../../../shared/persistence/place.js";
import { worlds, WorldSlug } from "zwift-data";

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

  res.status(200).header("Cache-Control", "public, max-age=86400").json(place);
}
