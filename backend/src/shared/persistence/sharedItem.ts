import { DetailedActivity, StreamSet } from "strava";
import { read, remove, write } from "./redis";

export type SharedItem = SharedItemStravaActivity;

export interface SharedItemStravaActivity {
  id: string;
  type: "strava-activity";
  activity: DetailedActivity;
  streams: StreamSet;
}

function createKey(sharedItemId: string): string {
  return `sharedItem:${sharedItemId}`;
}

export async function writeSharedItem(sharedItem: SharedItem) {
  const key = createKey(sharedItem.id);
  await write(key, sharedItem);
}

export async function readSharedItem(
  sharedItemId: string
): Promise<SharedItem | undefined> {
  return await read(createKey(sharedItemId));
}

export async function removeSharedItem(sharedItemId: string): Promise<void> {
  return await remove(createKey(sharedItemId));
}
