import axios from "axios";
import identity from "lodash/identity";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { logout } from "../auth";
import { createAxiosCacheAdapter } from "../axios-cache-adapter";
import { getRefreshedToken } from "./auth";
import { getStravaToken, StravaTokenLoading } from "./token";

const api = axios.create({
  baseURL: "https://www.strava.com/api/v3",
  adapter: createAxiosCacheAdapter(),
});

api.interceptors.request.use(async (config) => {
  let token = getStravaToken();

  if (token) {
    if (
      token === StravaTokenLoading ||
      token.expires_at < Math.round(Date.now() / 1_000)
    ) {
      try {
        token = await getRefreshedToken();
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

export async function fetchActivity(activityId: number) {
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  return response.data;
}

export async function updateActivity(
  activity: { id: number } & Partial<Omit<DetailedActivity, "id">>
) {
  await api.put<DetailedActivity>(`/activities/${activity.id}`, activity);
}

export async function fetchActivityStreams(activityId: number) {
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
