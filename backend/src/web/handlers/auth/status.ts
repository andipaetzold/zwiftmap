import { Request, Response } from "express";
import { Session } from "../../types.js";

export function handleGETAuthStatus(req: Request, res: Response) {
  const session = req.session as Session;

  res.status(200).json({
    strava: session.stravaAthleteId !== undefined,
  });
}
