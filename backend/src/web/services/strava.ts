import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../../shared/config";
import {
  readStravaToken,
  removeStravaToken,
  StravaToken,
  writeStravaToken,
} from "../../shared/persistence/stravaToken";

export const stravaUserAPI = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com/api/v3",
  params: {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
  },
});

export async function getToken(athleteId: number): Promise<string | undefined> {
  let stravaToken = await readStravaToken(athleteId);
  if (!stravaToken) {
    return;
  }

  if (stravaToken.expiresAt < Date.now() / 1_000 - 60) {
    stravaToken = await refreshToken(stravaToken);
    if (!stravaToken) {
      return;
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
    });

    return response.data;
  } catch {
    await removeStravaToken(stravaToken.athleteId);
    return undefined;
  }
}
