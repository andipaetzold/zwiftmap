import { StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { read, remove, write } from "./redis";
import objectHash from "object-hash";
import short from "short-uuid";

export type Share = ShareStravaActivity;

export interface ShareStravaActivity {
  id: string;
  type: "strava-activity";
  activity: {
    id: number;
    athleteId: number;
    name: string;
    distance: number;
    time: number;
    elevation: number;
    avgWatts?: number;
    photoUrl?: string;
    streams: StreamSet;
    latlng: [number, number];
  };
}

type ShareLookup = { [hash: string]: string };

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

function createKey(shareId: string): string {
  return `share:${shareId}`;
}
const LOOKUP_KEY = createKey("lookup");

export async function writeShare(
  share: Omit<Share, "id">
): Promise<Share> {
  const hash = objectHash(share);
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

export async function readShare(
  shareId: string
): Promise<Share | undefined> {
  return await read(createKey(shareId));
}

export async function removeShare(shareId: string): Promise<void> {
  return await remove(createKey(shareId));
}
