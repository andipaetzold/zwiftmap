import { fetchEvent, fetchEvents } from "./api";
import {
  getEventFromCache,
  getEventsFromCache,
  writeEventsToCache,
  writeEventToCache,
} from "./cache";
import { ZwiftEvent } from "./types";
export * from "./types";

export async function getEvents(): Promise<ZwiftEvent[]> {
  const cachedEvents = await getEventsFromCache();
  if (cachedEvents) {
    return cachedEvents;
  }

  const events = await fetchEvents();
  await writeEventsToCache(events);
  return events;
}

export async function getEvent(eventId: number): Promise<ZwiftEvent> {
  const cachedEvent = await getEventFromCache(eventId);
  if (cachedEvent) {
    return cachedEvent;
  }

  const event = await fetchEvent(eventId);
  await writeEventToCache(event);
  return event;
}
