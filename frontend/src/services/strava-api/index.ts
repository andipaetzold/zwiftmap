import { Activity, Streams } from "./types";

export async function request<T = any>(url: string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function fetchActivity(
  activityId: string,
  token: string
): Promise<Activity> {
  return await request<Activity>(
    `https://www.strava.com/api/v3/activities/${activityId}`,
    token
  );
}

export async function fetchActivityStreams(
  activityId: string,
  token: string
): Promise<Streams> {
  return await request<Streams>(
    `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=distance,latlng,time,altitude,wattage,speed,velocity_smooth,watts,cadence,heartrate&key_by_type=true`,
    token
  );
}
