import { DetailedActivity, DetailedSegment, StreamSet } from "strava";
import { redisClient } from "../../persistence/redis";

/**
 * One hour
 */
const TTL = 60 * 60;

const KEY = "strava-cache";
const TYPE_ACTIVITY = "activitie";
const TYPE_SEGMENT = "segment";
const KEY_STREAMS = "streams";

// Used keys
// strava:$athleteId:activities:$activityId
// strava:$athleteId:activities:$activityId:streams
// strava:$athleteId:segments:$segmentId

export async function getActivityByIdFromCache(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity | undefined> {
  try {
    const key = [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":");
    return await redisClient.get(key);
  } catch {
    return undefined;
  }
}

export async function writeActivityToCache(
  activity: DetailedActivity
): Promise<void> {
  try {
    const key = [KEY, activity.athlete.id, TYPE_ACTIVITY, activity.id].join(
      ":"
    );
    await redisClient.setex(key, activity, TTL);
  } catch {}
}

export async function getActivityStreamsFromCache(
  athleteId: number,
  activityId: number
): Promise<Partial<StreamSet> | undefined> {
  try {
    const key = [KEY, athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(
      ":"
    );
    return await redisClient.get(key);
  } catch {
    return undefined;
  }
}

export async function writeActivityStreamsToCache(
  athleteId: number,
  activityId: number,
  streams: Partial<StreamSet>
): Promise<void> {
  try {
    const key = [KEY, athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(
      ":"
    );
    await redisClient.setex(key, streams, TTL);
  } catch {}
}

export async function getSegmentFromCache(
  athleteId: number,
  segmentId: number
): Promise<DetailedSegment | undefined> {
  try {
    const key = [KEY, athleteId, TYPE_SEGMENT, segmentId].join(":");
    return await redisClient.get(key);
  } catch {
    return undefined;
  }
}

export async function writeSegmentToCache(
  athleteId: number,
  segment: DetailedSegment
): Promise<void> {
  try {
    const key = [KEY, athleteId, TYPE_SEGMENT, segment.id].join(":");
    await redisClient.setex(key, segment, TTL);
  } catch {}
}

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
