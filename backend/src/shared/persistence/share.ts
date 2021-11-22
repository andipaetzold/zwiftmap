import pick from "lodash/pick";
import objectHash from "object-hash";
import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { hget, hset, read, remove, write } from "./redis";

const STRAVA_ACTIVITIES = createKey("strava-activities");
const LOOKUP_KEY = createKey("lookup");

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

/**
 * @deprecated
 */
type ShareLookup = { [hash: string]: string };

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

function createKey(shareId: string): string {
  return `share:${shareId}`;
}

/**
 * @deprecated
 */
function createHash(share: Omit<Share, "id">): string {
  switch (share.type) {
    case "strava-activity":
      return objectHash(pick(share, ["type", "activity.id"]));
  }
}

export async function writeShare(
  shareWithoutId: Omit<Share, "id">
): Promise<Share> {
  const lookupShareId = await hget(
    STRAVA_ACTIVITIES,
    shareWithoutId.activity.id.toString()
  );
  if (lookupShareId) {
    return (await readShare(lookupShareId))!;
  }

  const lookup = (await read<ShareLookup>(LOOKUP_KEY)) ?? {};
  const hash = createHash(shareWithoutId);
  if (lookup[hash]) {
    // remove once migrated
    const id = lookup[hash];
    await hset(STRAVA_ACTIVITIES, shareWithoutId.activity.id.toString(), id);
    return (await readShare(id))!;
  } else {
    const id = short.generate();
    const shareWithId = { ...shareWithoutId, id };
    await write(createKey(id), shareWithId);
    await hset(STRAVA_ACTIVITIES, shareWithoutId.activity.id.toString(), id);

    // remove once migrated
    delete lookup[hash];
    await write<ShareLookup>(LOOKUP_KEY, lookup);

    return shareWithId;
  }
}

export async function readShare(shareId: string): Promise<Share | undefined> {
  const share = await read<Share>(createKey(shareId));
  if (!share) {
    return share;
  }

  switch (share.type) {
    case "strava-activity":
      // remove once migrated
      await hset(STRAVA_ACTIVITIES, share.activity.id.toString(), shareId);
      return share;
  }
}

export async function removeShare(shareId: string): Promise<void> {
  return await remove(createKey(shareId));
}
