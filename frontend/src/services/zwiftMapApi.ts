import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { BACKEND_HOST } from "../config";
import { AuthStatus, Share, StravaSettings } from "../types";
import { cachedRequest } from "./cached-request";
import { request } from "./request";

const DEFAULT_INIT: Partial<RequestInit> = {
  credentials: "include",
};

export async function getShare(id: string): Promise<Share> {
  return await cachedRequest(`${BACKEND_HOST}/share/${id}`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaSettings(): Promise<StravaSettings> {
  return await request(`${BACKEND_HOST}/strava/settings`, {
    ...DEFAULT_INIT,
  });
}

export async function updateStravaSettings(settings: StravaSettings) {
  await request(`${BACKEND_HOST}/strava/settings`, {
    ...DEFAULT_INIT,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
}

export async function getStravaActivities(): Promise<SummaryActivity[]> {
  return await cachedRequest(`${BACKEND_HOST}/strava/activities`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaActivityById(
  activityId: number
): Promise<DetailedActivity> {
  return await cachedRequest(
    `${BACKEND_HOST}/strava/activities/${activityId}`,
    {
      ...DEFAULT_INIT,
    }
  );
}

export async function updateStravaActivity(
  activityId: number,
  activity: Pick<DetailedActivity, "description">
) {
  await request(`${BACKEND_HOST}/strava/activities/${activityId}`, {
    ...DEFAULT_INIT,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
}

export async function getStravaSegmentById(
  segmentId: number
): Promise<DetailedSegment> {
  return await cachedRequest(`${BACKEND_HOST}/strava/segments/${segmentId}`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaActivityStreams(
  activityId: number
): Promise<Partial<StreamSet>> {
  return await cachedRequest(
    `${BACKEND_HOST}/strava/activities/${activityId}/streams`,
    { ...DEFAULT_INIT }
  );
}

export async function shareStravaActivity(
  activityId: number
): Promise<{ id: string }> {
  return await request(`${BACKEND_HOST}/share`, {
    ...DEFAULT_INIT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "strava-activity",
      stravaActivityId: activityId,
    }),
  });
}

export async function authLogout(): Promise<void> {
  await request(`${BACKEND_HOST}/auth/logout`, {
    ...DEFAULT_INIT,
    method: "POST",
  });
}

export async function getAuthStatus(): Promise<AuthStatus> {
  return await request(`${BACKEND_HOST}/auth/status`, {
    ...DEFAULT_INIT,
  });
}
