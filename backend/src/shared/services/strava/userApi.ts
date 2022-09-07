import { default as axios, AxiosInstance } from "axios";
import { RefreshTokenResponse } from "strava";
import {
  readStravaToken,
  removeStravaToken,
  writeStravaToken,
} from "../../persistence/stravaToken.js";
import { StravaToken } from "../../persistence/types.js";
import { stravaAppAPI } from "./appApi.js";
import { TokenNotFoundError } from "./types.js";

export async function getStravaUserAPI(
  athleteId: number
): Promise<AxiosInstance> {
  const token = await getToken(athleteId);

  return axios.create({
    baseURL: "https://www.strava.com/api/v3",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function getToken(athleteId: number): Promise<string> {
  let stravaToken = await readStravaToken(athleteId);
  if (!stravaToken) {
    throw new TokenNotFoundError();
  }

  if (stravaToken.expiresAt < Date.now() / 1_000 - 60) {
    stravaToken = await refreshToken(stravaToken);
    if (!stravaToken) {
      throw new TokenNotFoundError();
    }
  }

  return stravaToken.token;
}

async function refreshToken(
  stravaToken: StravaToken
): Promise<StravaToken | undefined> {
  try {
    const response = await stravaAppAPI.post<RefreshTokenResponse>(
      "/oauth/token",
      {
        grant_type: "refresh_token",
        refresh_token: stravaToken.refreshToken,
      }
    );

    const refreshedStravaToken: StravaToken = {
      athleteId: stravaToken.athleteId,
      expiresAt: response.data.expires_at,
      refreshToken: response.data.refresh_token,
      token: response.data.access_token,
      scope: stravaToken.scope,
    };

    await writeStravaToken(refreshedStravaToken);

    return refreshedStravaToken;
  } catch {
    await removeStravaToken(stravaToken.athleteId);
    return undefined;
  }
}
