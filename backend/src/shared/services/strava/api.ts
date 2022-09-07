import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { getStravaUserAPI } from "./userApi.js";

export async function fetchActivityById(athleteId: number, activityId: number) {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  return response.data;
}

export async function fetchActivityStreams(
  athleteId: number,
  activityId: number
) {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<Partial<StreamSet>>(
    `/activities/${activityId}/streams`,
    {
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
    }
  );
  return response.data;
}

interface GetActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export async function fetchActivities(
  athleteId: number,
  params: GetActivitiesParams
): Promise<SummaryActivity[]> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<SummaryActivity[]>(`/athlete/activities`, {
    params,
  });
  return response.data;
}

export async function updateActivity(
  athleteId: number,
  activityId: number,
  activity: Partial<Pick<DetailedActivity, "description">>
): Promise<DetailedActivity> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.put<DetailedActivity>(
    `/activities/${activityId}`,
    activity
  );
  return response.data;
}

export async function fetchSegmentById(athleteId: number, segmentId: number) {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
  return response.data;
}
