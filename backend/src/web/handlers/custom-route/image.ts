import { Request, Response } from "express";
import { Record, String } from "runtypes";
import {
  findMultiPointRoute,
  WORLD_ROADS,
} from "../../../shared/browser/roads/index.js";
import { createLatLngStreamImage } from "../../../shared/image/latLngStream.js";
import { NumberString } from "../../../shared/runtypes.js";
import { LatLng } from "../../../shared/types.js";
import { getWorld } from "../../../shared/util.js";

const SEPARATOR = "!";

const queryRunType = Record({
  points: String.withConstraint((v) => {
    const points = v.split(SEPARATOR);
    if (points.length < 2) {
      return false;
    }

    return (
      points.every((p) => p.split(",").length === 2) &&
      points.flatMap((p) => p.split(",")).every((x) => !isNaN(+x))
    );
  }),
  width: NumberString,
  height: NumberString,
});

export async function handleGETCustomRouteImage(req: Request, res: Response) {
  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const pointsToNavigate = req.query.points
    .split(SEPARATOR)
    .map((point) => point.split(",").map((x) => +x) as LatLng);

  const world = getWorld(pointsToNavigate[0]);
  if (!world) {
    res.sendStatus(400);
    return;
  }

  const roads = await WORLD_ROADS[world?.slug]();
  const route = findMultiPointRoute(pointsToNavigate, roads);
  if (!route) {
    res.sendStatus(404);
    return;
  }

  const stream = await createLatLngStreamImage(
    route.map((p) => [p[0], p[1]]),
    {
      width: +req.query.width,
      height: +req.query.height,
    }
  );
  res.contentType("png");
  stream.pipe(res);
}
