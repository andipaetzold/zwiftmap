import { DetailedActivity, StreamSet, DetailedSegment } from "./types";
import { setupCache } from "axios-cache-adapter";
import axios from "axios";

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

function getAuthHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function fetchActivity(activityId: string, token: string) {
  const response = await api.get<DetailedActivity>(
    `/activities/${activityId}`,
    {
      headers: getAuthHeader(token),
    }
  );
  return response.data;
}

export async function fetchActivityStreams(activityId: string, token: string) {
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
    headers: getAuthHeader(token),
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

export async function fetchSegment(segmentId: string, token: string) {
  const response = await api.get<DetailedSegment>(`/segments/${segmentId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
}
