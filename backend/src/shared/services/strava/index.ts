import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import {
  getActivityByIdFromCache,
  getActivityStreamsFromCache,
  getSegmentFromCache,
  writeActivityStreamsToCache,
  writeActivityToCache,
  writeSegmentToCache,
} from "./cache";
import { getStravaUserAPI } from "./userApi";
export { stravaAppAPI } from "./appApi";
export { evictCacheForActivity, evictCacheForAthlete } from "./cache";

export async function getActivityById(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity> {
  const cachedActivity = await getActivityByIdFromCache(athleteId, activityId);
  if (cachedActivity) {
    return cachedActivity;
  }

  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedActivity>(`/activities/${activityId}`);
  await writeActivityToCache(response.data);
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
): Promise<DetailedActivity> {
  const api = await getStravaUserAPI(athleteId);
  const response = await api.put<DetailedActivity>(
    `/activities/${activityId}`,
    activity
  );
  return response.data;
}

export async function getSegmentById(athleteId: number, segmentId: number) {
  const cachedSegment = await getSegmentFromCache(athleteId, segmentId);
  if (cachedSegment) {
    return cachedSegment;
  }

  const api = await getStravaUserAPI(athleteId);
  const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
  await writeSegmentToCache(athleteId, response.data);
  return response.data;
}

export async function getActivityStreams(
  athleteId: number,
  activityId: number
): Promise<StreamSet> {
  const cachedStreams = await getActivityStreamsFromCache(
    athleteId,
    activityId
  );
  if (cachedStreams) {
    return cachedStreams;
  }

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
  await writeActivityStreamsToCache(athleteId, activityId, response.data);
  return response.data;
}
