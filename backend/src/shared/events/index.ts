import { createRedisCachedFn } from "../services/redis-cache";
import { fetchEvent, fetchEvents } from "./api";
export * from "./types";

export const getEvents = createRedisCachedFn(fetchEvents, "events", 5 * 60);
export const getEvent = createRedisCachedFn(
  fetchEvent,
  (eventId) => `events:${eventId}`,
  60 * 60
);
