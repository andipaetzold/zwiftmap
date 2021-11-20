import pick from "lodash/pick";
import objectHash from "object-hash";
import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { read, remove, write } from "./redis";

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
  hasImage: boolean;
}

type ShareLookup = { [hash: string]: string };

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

function createKey(shareId: string): string {
  return `share:${shareId}`;
}

function createHash(share: Omit<Share, "id">): string {
  switch (share.type) {
    case "strava-activity":
      return objectHash(pick(share, ["type", "activity.id"]));
  }
}

const LOOKUP_KEY = createKey("lookup");

export async function writeShare(share: Omit<Share, "id">): Promise<Share> {
  const hash = createHash(share);
  const lookup = (await read<ShareLookup>(LOOKUP_KEY)) ?? {};

  if (lookup[hash]) {
    const id = lookup[hash];
    return (await readShare(id))!;
  } else {
    const id = short.generate();
    lookup[hash] = id;

    const itemWithId = { ...share, id };

    await write(createKey(id), itemWithId);
    await write(LOOKUP_KEY, lookup);

    return itemWithId;
  }
}

export async function readShare(shareId: string): Promise<Share | undefined> {
  const share = await read<Share>(createKey(shareId));
  if (!share) {
    return share;
  }

  switch (share.type) {
    case "strava-activity":
      return {
        ...share,
        hasImage: share.hasImage ?? false,
      };
  }
}

export async function removeShare(shareId: string): Promise<void> {
  return await remove(createKey(shareId));
}
