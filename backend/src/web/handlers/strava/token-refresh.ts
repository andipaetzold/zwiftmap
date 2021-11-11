import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { RefreshTokenResponse } from "strava/dist/types";
import {
  readStravaToken,
  writeStravaToken,
} from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../../shared/services/strava";
import { Session } from "../../types";

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const stravaToken = await readStravaToken(session.stravaAthleteId);
  if (!stravaToken) {
    res.sendStatus(500);
    return;
  }

  let refreshResponse: AxiosResponse;
  try {
    refreshResponse = await stravaAppAPI.post<RefreshTokenResponse>(
      "/oauth/token",
      {
        grant_type: "refresh_token",
        refresh_token: stravaToken.refreshToken,
      }
    );
  } catch (e) {
    if (axios.isAxiosError(e) && e.response !== undefined) {
      res.sendStatus(e.response.status);
    } else {
      res.sendStatus(500);
    }
    return;
  }
  const responseData = refreshResponse.data;

  await writeStravaToken({
    athleteId: session.stravaAthleteId,
    expiresAt: responseData.expires_at,
    refreshToken: responseData.refresh_token,
    token: responseData.access_token,
    scope: stravaToken.scope,
  });

  res.json(responseData);
}
