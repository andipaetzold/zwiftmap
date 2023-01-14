import { Request, Response } from "express";
import {
  isStravaAdminUser,
  isStravaBetaUser,
  isStravaModeratorUser,
} from "../../../shared/services/strava/index.js";
import { Session } from "../../types.js";

export function handleGETAuthStatus(req: Request, res: Response) {
  const session = req.session as Session;
  res.status(200).json({
    strava: session.stravaAthleteId !== undefined,
    betaUser:
      session.stravaAthleteId !== undefined &&
      isStravaBetaUser(session.stravaAthleteId),
    adminUser:
      session.stravaAthleteId !== undefined &&
      isStravaAdminUser(session.stravaAthleteId),
    moderatorUser:
      session.stravaAthleteId !== undefined &&
      isStravaModeratorUser(session.stravaAthleteId),
  });
}
