import axios from "axios";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { BACKEND_HOST } from "../config";
import { Share, StravaSettings } from "../types";
import { createAxiosCacheAdapter } from "./axios-cache-adapter";

export const zwiftMapApi = axios.create({
  baseURL: BACKEND_HOST,
  withCredentials: true,
  adapter: createAxiosCacheAdapter({
    filter: (config) => config.url!.startsWith("/strava"),
  }),
});

export async function getShare(id: string) {
  const response = await zwiftMapApi.get<Share>(`/share/${id}`);
  return response.data;
}

export async function getStravaSettings() {
  const response = await zwiftMapApi.get<StravaSettings>(`/strava/settings`);
  return response.data;
}

export async function updateStravaSettings(settings: StravaSettings) {
  await zwiftMapApi.put<StravaSettings>(`/strava/settings`, settings);
}

interface GetStravaActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export async function getStravaActivities(params?: GetStravaActivitiesParams) {
  const response = await zwiftMapApi.get<SummaryActivity[]>(
    `/strava/activities`,
    { params }
  );
  return response.data;
}

export async function getStravaActivityById(activityId: number) {
  const response = await zwiftMapApi.get<DetailedActivity>(
    `/strava/activities/${activityId}`
  );
  return response.data;
}

export async function updateStravaActivity(
  activityId: number,
  activity: Pick<DetailedActivity, "description">
) {
  await zwiftMapApi.put(`/strava/activities/${activityId}`, activity);
}

export async function getStravaSegmentById(segmentId: number) {
  const response = await zwiftMapApi.get<DetailedSegment>(
    `/strava/segments/${segmentId}`
  );
  return response.data;
}

export async function getStravaActivityStreams(activityId: number) {
  const response = await zwiftMapApi.get<StreamSet>(
    `/strava/activities/${activityId}/streams`
  );
  return response.data;
}
