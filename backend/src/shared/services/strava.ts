import axios, { AxiosInstance } from "axios";
import { DetailedActivity, StreamSet } from "strava";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../config";
import {
  readStravaToken,
  removeStravaToken,
  StravaToken,
  writeStravaToken,
} from "../persistence/stravaToken";

export class TokenNotFoundError extends Error {}

async function getStravaUserAPI(athleteId: number): Promise<AxiosInstance> {
  const token = await getToken(athleteId);

  return axios.create({
    baseURL: "https://www.strava.com/api/v3",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com",
  params: {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
  },
});

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

export async function getActivityById(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  return response.data;
}

export async function updateActivity(
  athleteId: number,
  activity: Partial<DetailedActivity>
): Promise<void> {
  const api = await getStravaUserAPI(athleteId);
  await api.put<DetailedActivity>(`/activities/${activity.id}`, activity);
}

export async function getActivityStreams(
  athleteId: number,
  activityId: number
): Promise<StreamSet> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<StreamSet>(
    `/activities/${activityId}/streams`,
    {
      params: {
        keys: [
          "distance",
          "latlng",
          "time",
          "altitude",
          "watts",
          "velocity_smooth",
          "watts",
          "cadence",
          "heartrate",
        ].join(","),
        key_by_type: true,
      },
    }
  );
  return response.data;
}
