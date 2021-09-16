import {
  DetailedActivity,
  StreamSet,
  DetailedSegment,
  SummaryActivity,
} from "./types";
import axios from "axios";
import { getStravaToken, removeStravaToken, writeStravaToken } from "./token";
import { getRefreshedToken } from "./auth";
import { axiosCache } from "../axios-cache";
import identity from "lodash/identity";

const cache = axiosCache();

const api = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

api.interceptors.request.use(cache.request);
api.interceptors.response.use(...cache.response);

api.interceptors.request.use(async (config) => {
  let token = getStravaToken();

  if (token) {
    if (token.expires_at < Math.round(Date.now() / 1_000)) {
      try {
        token = await getRefreshedToken(token.refresh_token);
        writeStravaToken(token);
      } catch {
        await removeStravaToken();
        return config;
      }
    }

    config.headers = {
      ...config.headers,
      Authorization: `${token.token_type} ${token.access_token}`,
    };
  }

  return config;
});

api.interceptors.response.use(identity, async (error) => {
  await removeStravaToken();
  return error;
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

interface GetLoggedInAthleteActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export async function getLoggedInAthleteActivities(
  params: GetLoggedInAthleteActivitiesParams = {}
): Promise<Array<SummaryActivity>> {
  const response = await api.get(`/athlete/activities`, { params });
  return response.data;
}
