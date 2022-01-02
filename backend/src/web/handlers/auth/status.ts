import { Request, Response } from "express";
import { Session } from "../../types";

export function handleGETAuthStatus(req: Request, res: Response) {
  const session = req.session as Session;

  res
    .header("Cache-control", "no-store")
    .status(200)
    .json({
      strava: session.stravaAthleteId !== undefined,
    });
}
