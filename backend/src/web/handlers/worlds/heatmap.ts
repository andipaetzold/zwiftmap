import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { worlds, WorldSlug } from "zwift-data";
import sharp from "sharp";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
});

export async function handleGETHeatmap(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const worldSlug = req.params.worldSlug;
  const world = worlds.find((w) => w.slug === worldSlug)!;

  const image = sharp({
    create: {
      background: { r: 255, g: 255, b: 255, alpha: 0 },
      channels: 4,
      height: 100,
      width: 100,
    },
  });

  const stream = image.png();
  res.contentType("png");
  stream.pipe(res);
}
