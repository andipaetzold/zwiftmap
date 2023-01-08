import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { worlds, WorldSlug } from "zwift-data";
import { readPlacesByWorld } from "../../../../shared/persistence/index.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
});

export async function handleGETPlacesByWorld(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const places = await readPlacesByWorld(req.params.worldSlug);

  res.status(200).header("Cache-Control", "public, max-age=86400").json(places);
}
