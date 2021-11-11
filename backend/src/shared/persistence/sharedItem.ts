import { StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { read, remove, write } from "./redis";
import objectHash from "object-hash";
import short from "short-uuid";

export type SharedItem = SharedItemStravaActivity;

export interface SharedItemStravaActivity {
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

type SharedItemLookup = { [hash: string]: string };

export function getSharedItemUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

function createKey(sharedItemId: string): string {
  return `sharedItem:${sharedItemId}`;
}
const LOOKUP_KEY = createKey("lookup");

export async function writeSharedItem(
  sharedItem: Omit<SharedItem, "id">
): Promise<SharedItem> {
  const hash = objectHash(sharedItem);
  const lookup = (await read<SharedItemLookup>(LOOKUP_KEY)) ?? {};

  if (lookup[hash]) {
    const id = lookup[hash];
    return (await readSharedItem(id))!;
  } else {
    const id = short.generate();
    lookup[hash] = id;

    const itemWithId = { ...sharedItem, id };

    await write(createKey(id), itemWithId);
    await write(LOOKUP_KEY, lookup);

    return itemWithId;
  }
}

export async function readSharedItem(
  sharedItemId: string
): Promise<SharedItem | undefined> {
  return await read(createKey(sharedItemId));
}

export async function removeSharedItem(sharedItemId: string): Promise<void> {
  return await remove(createKey(sharedItemId));
}
