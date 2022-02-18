import { redisClient } from "../persistence/redis";
import { ZwiftEvent } from "./types";

const TTL_EVENTS = 5 * 60; // 5 mins
const TTL_EVENT = 60 * 60; // 60 mins

const KEY = "strava-cache";

// Used keys
// events
// events:$eventId

export async function getEventsFromCache(): Promise<ZwiftEvent[] | undefined> {
  try {
    return await redisClient.get(KEY);
  } catch {
    return undefined;
  }
}

export async function writeEventsToCache(events: ZwiftEvent[]): Promise<void> {
  try {
    await redisClient.setex(KEY, events, TTL_EVENTS);
  } catch {}
}

export async function getEventFromCache(
  eventId: number
): Promise<ZwiftEvent | undefined> {
  try {
    const key = [KEY, eventId].join(":");
    return await redisClient.get(key);
  } catch {
    return undefined;
  }
}

export async function writeEventToCache(event: ZwiftEvent): Promise<void> {
  try {
    const key = [KEY, event.id].join(":");
    await redisClient.setex(key, event, TTL_EVENT);
  } catch {}
}
