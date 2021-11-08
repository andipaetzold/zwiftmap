import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import {
  readStravaToken,
  writeStravaToken,
} from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../../shared/services/strava";
import { Session } from "../../types";

const Body = Record({
  refresh_token: String.withConstraint((t) => t.length > 0),
});

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;

  let refreshToken = req.body.refresh_token;
  if (session.stravaAthleteId) {
    const token = await readStravaToken(session.stravaAthleteId);
    if (!token) {
      res.sendStatus(500);
      return;
    }
    refreshToken = token.refreshToken;
  }

  let refreshResponse: AxiosResponse;
  try {
    refreshResponse = await stravaAppAPI.post("/oauth/token", {
      grant_type: "refresh_token",
      refresh_token: req.body.refresh_token,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response !== undefined) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(500);
    }
    return;
  }
  const responseData = refreshResponse.data;

  if (session.stravaAthleteId) {
    await writeStravaToken({
      athleteId: session.stravaAthleteId,
      expiresAt: responseData.expires_at,
      refreshToken: responseData.refresh_token,
      token: responseData.access_token,
    });
  }

  res.json(responseData);
}
