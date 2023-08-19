import { Feature, MultiPolygon, Polygon } from "@turf/helpers";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { WorldSlug } from "zwift-data";
import { BACKEND_HOST } from "../config";
import { AuthStatus, Place, Share, StravaSettings, ZwiftEvent } from "../types";
import { cachedRequest } from "./cached-request";
import { request } from "./request";

const DEFAULT_INIT: Partial<RequestInit> = {
  credentials: "include",
};

export async function getShare(id: string): Promise<Share> {
  return await request<Share>(`${BACKEND_HOST}/share/${id}`, {
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
  return await request(`${BACKEND_HOST}/strava/activities`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaActivityById(
  activityId: number,
): Promise<DetailedActivity> {
  return await request(`${BACKEND_HOST}/strava/activities/${activityId}`, {
    ...DEFAULT_INIT,
  });
}

export async function updateStravaActivity(
  activityId: number,
  activity: Pick<DetailedActivity, "description">,
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
  segmentId: number,
): Promise<DetailedSegment> {
  return await request(`${BACKEND_HOST}/strava/segments/${segmentId}`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaActivityStreams(
  activityId: number,
): Promise<Partial<StreamSet>> {
  return await cachedRequest(
    `${BACKEND_HOST}/strava/activities/${activityId}/streams`,
    { ...DEFAULT_INIT },
  );
}

export async function shareStravaActivity(
  activityId: number,
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

export async function getEvents(): Promise<ZwiftEvent[]> {
  return await request<ZwiftEvent[]>(`${BACKEND_HOST}/events`);
}

export async function getEvent(eventId: number): Promise<ZwiftEvent> {
  return await request<ZwiftEvent>(`${BACKEND_HOST}/events/${eventId}`);
}

export async function getStravaFogStats(world: WorldSlug): Promise<{
  activityDistance: number;
  activityCount: number;
  worldDistance: number;
  unlockedDistance: number;
}> {
  return await request(`${BACKEND_HOST}/strava/fog/${world}/stats`, {
    ...DEFAULT_INIT,
  });
}

export async function getStravaFogGeoJSON(
  world: WorldSlug,
): Promise<Feature<Polygon | MultiPolygon>> {
  return await request(`${BACKEND_HOST}/strava/fog/${world}/geojson`, {
    ...DEFAULT_INIT,
  });
}

export async function getPlaces(
  verified: boolean | undefined,
): Promise<Place[]> {
  const params = new URLSearchParams();
  if (verified !== undefined) {
    params.set("filter[verified]", String(verified));
  }

  const url = new URL(`${BACKEND_HOST}/places`);
  url.search = params.toString();

  return await request<Place[]>(url.toString(), {
    ...DEFAULT_INIT,
  });
}

export async function getWorldPlaces(
  world: WorldSlug,
  verified: boolean | undefined,
): Promise<Place[]> {
  const params = new URLSearchParams();
  if (verified !== undefined) {
    params.set("filter[verified]", String(verified));
  }

  const url = new URL(`${BACKEND_HOST}/worlds/${world}/places`);
  url.search = params.toString();

  return await request<Place[]>(url.toString(), {
    ...DEFAULT_INIT,
  });
}

export async function createPlace(
  place: Omit<Place, "id" | "image"> & {
    imageObjectId: string | null;
  },
): Promise<Place> {
  return await request<Place>(`${BACKEND_HOST}/worlds/${place.world}/places`, {
    ...DEFAULT_INIT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(place),
  });
}

export async function updatePlace(
  place: Omit<Place, "image"> & { imageObjectId?: string },
): Promise<Place> {
  return await request<Place>(
    `${BACKEND_HOST}/worlds/${place.world}/places/${place.id}`,
    {
      ...DEFAULT_INIT,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place),
    },
  );
}

export async function deletePlace(
  place: Pick<Place, "id" | "world">,
): Promise<void> {
  await request(`${BACKEND_HOST}/worlds/${place.world}/places/${place.id}`, {
    method: "DELETE",
    ...DEFAULT_INIT,
  });
}

export async function getPlace(world: WorldSlug, id: string): Promise<Place> {
  return await request<Place>(`${BACKEND_HOST}/worlds/${world}/places/${id}`, {
    ...DEFAULT_INIT,
  });
}

export async function uploadFile(file: File): Promise<string> {
  const { uploadUrl, objectId } = await request<{
    uploadUrl: string;
    objectId: string;
  }>(`${BACKEND_HOST}/uploads`, {
    ...DEFAULT_INIT,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType: file.type, contentLength: file.size }),
  });

  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return objectId;
}
