import { Request, Response } from "express";
import { Session } from "../../../web/types.js";
import { readPlaces } from "../../../shared/persistence/index.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser,
} from "../../../shared/services/strava/utils.js";
import { Literal, Record, Union } from "runtypes";

export async function handleGETPlaces(req: Request, res: Response) {
  const session = req.session as Session | undefined;
  const canReadVerified =
    session?.stravaAthleteId !== undefined &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));
  const queryRunType = createQueryRuntype(canReadVerified);
  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const verifiedFilter = req.query.filter?.verified;
  const places = await readPlaces(
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
