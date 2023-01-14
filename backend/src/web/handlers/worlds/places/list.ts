import { Request, Response } from "express";
import { Boolean, Literal, Record, String, Union } from "runtypes";
import { Session } from "../../../../web/types.js";
import { worlds, WorldSlug } from "zwift-data";
import { readPlacesByWorld } from "../../../../shared/persistence/index.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser,
} from "../../../../shared/services/strava/index.js";

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

  const session = req.session as Session | undefined;
  const canVerify =
    session?.stravaAthleteId !== undefined &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));
  const queryRunType = createQueryRuntype(canVerify);
  if (!queryRunType.guard(req.query)) {
    queryRunType.check(req.query);
    res.sendStatus(400);
    return;
  }

  const verifiedFilter = req.query.filter?.verified;
  const places = await readPlacesByWorld(
    req.params.worldSlug,
    verifiedFilter === undefined ? verifiedFilter === "true" : undefined
  );

  res.status(200).json(places);
}

function createQueryRuntype(canVerify: boolean) {
  return Record({
    filter: Record({
      verified: canVerify
        ? Union(Literal("true"), Literal("false")).optional()
        : Literal("true"),
    }),
  });
}
