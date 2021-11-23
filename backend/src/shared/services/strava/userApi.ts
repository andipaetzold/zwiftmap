import axios, { AxiosInstance } from "axios";
import {
  readStravaToken,
  removeStravaToken,
  StravaToken,
  writeStravaToken,
} from "../../persistence/stravaToken";
import { stravaAppAPI } from "./appApi";
import { TokenNotFoundError } from "./types";

export async function getStravaUserAPI(athleteId: number): Promise<AxiosInstance> {
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
    const response = await stravaAppAPI.post("/oauth/token", {
      grant_type: "refresh_token",
      refresh_token: stravaToken.refreshToken,
    });

    await writeStravaToken({
      athleteId: stravaToken.athleteId,
      expiresAt: response.data.expires_at,
      refreshToken: response.data.refresh_token,
      token: response.data.access_token,
      scope: stravaToken.scope,
    });

    return response.data;
  } catch {
    await removeStravaToken(stravaToken.athleteId);
    return undefined;
  }
}
