import { nodeCache } from "../cache";
import { createCachedFn } from "../cache-fn";
import {
  fetchActivityById,
  fetchActivityStreams,
  fetchSegmentById,
} from "./api";
export { fetchActivities as getActivities, updateActivity } from "./api";
export { stravaAppAPI } from "./appApi";

/**
 * One hour
 */
const TTL = 60 * 60;

const KEY = "strava-cache";
const TYPE_ACTIVITY = "activity";
const TYPE_SEGMENT = "segment";
const KEY_STREAMS = "streams";

export const getActivityById = createCachedFn(
  fetchActivityById,
  (athleteId, activityId) =>
    // strava:$athleteId:activities:$activityId
    [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":"),
  TTL
);

export const getSegmentById = createCachedFn(
  fetchSegmentById,
  (athleteId, segmentId) =>
    // strava:$athleteId:segments:$segmentId
    [KEY, athleteId, TYPE_SEGMENT, segmentId].join(":"),
  TTL
);

export const getActivityStreams = createCachedFn(
  fetchActivityStreams,
  (athleteId, activityId) =>
    // strava:$athleteId:activities:$activityId:streams
    [KEY, athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(":"),
  TTL
);

export async function evictCacheForAthlete(athleteId: number) {
  const allKeys = nodeCache.keys();
  const pattern = [KEY, athleteId, ""].join(":");
  const keys = allKeys.filter((key) => key.startsWith(pattern));
  nodeCache.del(keys);
}

export async function evictCacheForActivity(
  athleteId: number,
  activityId: number
) {
  const key = [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":");
  nodeCache.del(key);

  const streamsKey = [
    KEY,
    athleteId,
    TYPE_ACTIVITY,
    activityId,
    "streams",
  ].join(":");
  nodeCache.del(streamsKey);
}
