import axios from "axios";
import identity from "lodash/identity";
import { logout } from "../auth";
import { axiosCache } from "../axios-cache";
import { getRefreshedToken } from "./auth";
import { getStravaToken, writeStravaToken } from "./token";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";

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
        await logout();
        return config;
      }
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token.access_token}`,
    };
  }

  return config;
});

api.interceptors.response.use(identity, async (error) => {
  await logout();
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
        "watts",
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
  const response = await api.get<SummaryActivity[]>(`/athlete/activities`, {
    params,
  });
  return response.data;
}
