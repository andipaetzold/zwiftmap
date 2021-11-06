import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { stravaAppAPI } from "../../services/strava";

const Body = Record({
  refresh_token: String.withConstraint((t) => t.length > 0),
});

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const response = await stravaAppAPI.post("/oauth/token", {
    grant_type: "refresh_token",
    refresh_token: req.body.refresh_token,
  });
  res.send(response.data);
}
