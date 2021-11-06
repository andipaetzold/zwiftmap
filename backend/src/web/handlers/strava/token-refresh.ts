import { Request, Response } from "express";
import { stravaAppAPI } from "../../services/strava";

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  const refreshToken = req.body.refresh_token;

  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    res.sendStatus(400);
    return;
  }

  const response = await stravaAppAPI.post("/oauth/token", {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  res.send(response.data);
}
