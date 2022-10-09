import { Request, Response } from "express";
import { config } from "../../../shared/config.js";
import { Session } from "../../types.js";

export function handleGETAuthStatus(req: Request, res: Response) {
  const session = req.session as Session;
  res.status(200).json({
    strava: session.stravaAthleteId !== undefined,
    betaUser:
      session.stravaAthleteId !== undefined &&
      config.strava.betaUsers.includes(session.stravaAthleteId),
  });
}
