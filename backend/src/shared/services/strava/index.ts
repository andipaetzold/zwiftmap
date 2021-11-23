import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { getStravaUserAPI } from "./userApi";
export { stravaAppAPI } from "./appApi";

export async function getActivityById(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  return response.data;
}

interface GetActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export async function getActivities(
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
): Promise<void> {
  const api = await getStravaUserAPI(athleteId);
  await api.put<DetailedActivity>(`/activities/${activityId}`, activity);
}

export async function getSegmentById(athleteId: number, segmentId: number) {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
  return response.data;
}

export async function getActivityStreams(
  athleteId: number,
  activityId: number
): Promise<StreamSet> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<StreamSet>(
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
