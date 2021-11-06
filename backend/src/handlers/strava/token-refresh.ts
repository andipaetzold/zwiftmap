import { Request, Response } from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../../config";

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  const refreshToken = req.body.refresh_token;

  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    res.sendStatus(400);
    return;
  }

  const params = new URLSearchParams();
  params.set("client_id", STRAVA_CLIENT_ID);
  params.set("client_secret", STRAVA_CLIENT_SECRET);
  params.set("grant_type", "refresh_token");
  params.set("refresh_token", refreshToken);
  const url = `https://www.strava.com/api/v3/oauth/token?${params.toString()}`;

  const response = await fetch(url, { method: "POST" });
  const responseJSON = await response.json();

  res.send(responseJSON);
}
