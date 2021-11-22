import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { redisClient } from "./redis";

const STRAVA_ACTIVITIES = createKey("strava-activities");

export type Share = ShareStravaActivity;

export interface ShareStravaActivity {
  id: string;
  type: "strava-activity";
  activity: Pick<
    DetailedActivity,
    | "id"
    | "name"
    | "distance"
    | "moving_time"
    | "total_elevation_gain"
    | "average_watts"
    | "start_latlng"
    | "start_date"
  >;
  athlete: { id: number };
  streams: StreamSet;
}

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

function createKey(shareId: string): string {
  return `share:${shareId}`;
}

export async function writeShare(
  shareWithoutId: Omit<Share, "id">
): Promise<Share> {
  const lookupShareId = await redisClient.hget(
    STRAVA_ACTIVITIES,
    shareWithoutId.activity.id.toString()
  );
  if (lookupShareId) {
    return (await readShare(lookupShareId))!;
  }

  const id = short.generate();
  const shareWithId = { ...shareWithoutId, id };
  await redisClient.set(createKey(id), shareWithId);
  await redisClient.hset(
    STRAVA_ACTIVITIES,
    shareWithoutId.activity.id.toString(),
    id
  );

  return shareWithId;
}

export async function readShare(shareId: string): Promise<Share | undefined> {
  const share = await redisClient.get<Share>(createKey(shareId));
  if (!share) {
    return share;
  }

  switch (share.type) {
    case "strava-activity":
      return share;
  }
}

export async function removeShare(shareId: string): Promise<void> {
  return await redisClient.del(createKey(shareId));
}
