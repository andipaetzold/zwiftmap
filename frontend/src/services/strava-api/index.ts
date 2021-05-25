import { DetailedActivity, StreamSet, DetailedSegment } from "./types";

export async function request<T = any>(url: string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function fetchActivity(activityId: string, token: string) {
  return await request<DetailedActivity>(
    `https://www.strava.com/api/v3/activities/${activityId}`,
    token
  );
}

export async function fetchActivityStreams(activityId: string, token: string) {
  return await request<
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
  >(
    `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=distance,latlng,time,altitude,wattage,velocity_smooth,watts,cadence,heartrate&key_by_type=true`,
    token
  );
}

export async function fetchSegment(segmentId: string, token: string) {
  return await request<DetailedSegment>(
    `https://www.strava.com/api/v3/segments/${segmentId}`,
    token
  );
}
