import { redisClient } from "../../persistence/redis";
import { createRedisCachedFn } from "../redis-cache";
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

export const getActivityById = createRedisCachedFn(
  fetchActivityById,
  (athleteId, activityId) =>
    // strava:$athleteId:activities:$activityId
    [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":"),
  TTL
);

export const getSegmentById = createRedisCachedFn(
  fetchSegmentById,
  (athleteId, segmentId) =>
    // strava:$athleteId:segments:$segmentId
    [KEY, athleteId, TYPE_SEGMENT, segmentId].join(":"),
  TTL
);

export const getActivityStreams = createRedisCachedFn(
  fetchActivityStreams,
  (athleteId, activityId) =>
    // strava:$athleteId:activities:$activityId:streams
    [KEY, athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(":"),
  TTL
);

export async function evictCacheForAthlete(athleteId: number) {
  try {
    const pattern = [KEY, athleteId, "*"].join(":");
    const keys = await redisClient.keys(pattern);

    for (const key of keys) {
      await redisClient.del(key);
    }
  } catch {}
}

export async function evictCacheForActivity(
  athleteId: number,
  activityId: number
) {
  try {
    const key = [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":");
    await redisClient.del(key);

    const keyStreams = [
      KEY,
      athleteId,
      TYPE_ACTIVITY,
      activityId,
      "streams",
    ].join(":");
    await redisClient.del(keyStreams);
  } catch {}
}
