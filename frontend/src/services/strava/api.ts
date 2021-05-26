import { DetailedActivity, StreamSet, DetailedSegment } from "./types";
import { setupCache } from "axios-cache-adapter";
import axios from "axios";
import { getStravaToken, writeStravaToken } from "./token";
import { getRefreshedToken } from "./auth";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    query: false,
  },
});

const api = axios.create({
  adapter: cache.adapter,
  baseURL: "https://www.strava.com/api/v3",
});

api.interceptors.request.use(async (config) => {
  let token = getStravaToken();

  if (token) {
    if (token.expires_at < Math.round(Date.now() / 1000)) {
      token = await getRefreshedToken(token.refresh_token);
      writeStravaToken(token);
    }

    config.headers = {
      ...config.headers,
      Authorization: `${token.token_type} ${token.access_token}`,
    };
  }

  return config;
});

export async function fetchActivity(activityId: string) {
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  return response.data;
}

export async function fetchActivityStreams(activityId: string) {
  const response = await api.get<
    Pick<
      StreamSet,
      | "distance"
      | "latlng"
      | "time"
      | "altitude"
      | "watts"
      | "velocity_smooth"
      | "cadence"
      | "heartrate"
    >
  >(`/activities/${activityId}/streams`, {
    params: {
      keys: [
        "distance",
        "latlng",
        "time",
        "altitude",
        "wattage",
        "velocity_smooth",
        "watts",
        "cadence",
        "heartrate",
      ].join(","),
      key_by_type: true,
    },
  });
  return response.data;
}

export async function fetchSegment(segmentId: string) {
  const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
  return response.data;
}
