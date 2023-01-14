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
  const canReadUnverified =
    session?.stravaAthleteId !== undefined &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));
  const queryRunType = createQueryRuntype(canReadUnverified);
  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const verifiedFilter = req.query.filter?.verified;
  const places = await readPlacesByWorld(
    req.params.worldSlug,
    verifiedFilter === undefined ? undefined : verifiedFilter === "true"
  );

  res.status(200).json(places);
}

function createQueryRuntype(canReadUnverified: boolean) {
  if (canReadUnverified) {
    return Record({
      filter: Record({
        verified: Union(Literal("true"), Literal("false")).optional(),
      }).optional(),
    }).optional();
  } else {
    return Record({
      filter: Record({
        verified: Literal("true"),
      }),
    });
  }
}
