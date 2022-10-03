import { createCachedFn } from "../services/cache/cache-fn.js";
import { fetchEvent, fetchEvents } from "./api.js";
export * from "./types.js";

export const getEvents = createCachedFn(fetchEvents, "events", 5 * 60);
export const getEvent = createCachedFn(
  fetchEvent,
  (eventId) => `events:${eventId}`,
  60 * 60
);
