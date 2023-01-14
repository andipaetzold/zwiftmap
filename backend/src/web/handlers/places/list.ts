import { Request, Response } from "express";
import { Session } from "../../../web/types.js";
import { readPlaces } from "../../../shared/persistence/index.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser,
} from "../../../shared/services/strava/utils.js";
import { Literal, Record, Boolean, Union } from "runtypes";

export async function handleGETPlaces(req: Request, res: Response) {
  const session = req.session as Session | undefined;
  const canVerify =
    session?.stravaAthleteId !== undefined &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));
  const queryRunType = createQueryRuntype(canVerify);
  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const verifiedFilter = req.query.filter?.verified;
  const places = await readPlaces(
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
