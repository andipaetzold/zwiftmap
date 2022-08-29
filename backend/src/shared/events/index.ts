import { createCachedFn } from "../services/cache-fn";
import { fetchEvent, fetchEvents } from "./api";
export * from "./types";

export const getEvents = createCachedFn(fetchEvents, "events", 5 * 60);
export const getEvent = createCachedFn(
  fetchEvent,
  (eventId) => `events:${eventId}`,
  60 * 60
);
