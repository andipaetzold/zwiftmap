import { DetailedActivity, StreamSet } from "strava";
import { redisClient } from "../../persistence/redis";

/**
 * One hour
 */
const TTL = 60 * 60;

const KEY_ACTIVITIES = "strava-activities";
const KEY_STREAMS = "streams";

export async function getActivityByIdFromCache(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity | undefined> {
  const key = [KEY_ACTIVITIES, athleteId, activityId].join(":");
  return await redisClient.get(key);
}

export async function writeActivityToCache(
  activity: DetailedActivity
): Promise<void> {
  const key = [KEY_ACTIVITIES, activity.athlete.id, activity.id].join(":");
  await redisClient.setex(key, activity, TTL);
}

export async function getActivityStreamsFromCache(
  athleteId: number,
  activityId: number
): Promise<StreamSet | undefined> {
  const key = [KEY_ACTIVITIES, athleteId, activityId, KEY_STREAMS].join(":");
  return await redisClient.get(key);
}

export async function writeActivityStreamsToCache(
  athleteId: number,
  activityId: number,
  streams: StreamSet
): Promise<void> {
  const key = [KEY_ACTIVITIES, athleteId, activityId, KEY_STREAMS].join(":");
  await redisClient.setex(key, streams, TTL);
}

export async function evictCacheForAthlete(athleteId: number) {
  const pattern = [KEY_ACTIVITIES, athleteId, "*"].join(":");
  const keys = await redisClient.keys(pattern);

  for (const key of keys) {
    await redisClient.del(key);
  }
}

export async function evictCacheForActivity(
  athleteId: number,
  activityId: number
) {
  const key = [KEY_ACTIVITIES, athleteId, activityId].join(":");
  await redisClient.del(key);

  const keyStreams = [KEY_ACTIVITIES, athleteId, activityId, "streams"].join(
    ":"
  );
  await redisClient.del(keyStreams);
}
