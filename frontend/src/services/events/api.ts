import axios from "axios";
import { ZwiftEvent } from "./types";

let listCache: Promise<ZwiftEvent[]> | undefined;

const api = axios.create({
  baseURL: "https://us-or-rly101.zwift.com/api",
});

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  if (!listCache) {
    listCache = api
      .get<ZwiftEvent[]>("/public/events/upcoming")
      .then((r) => r.data);
  }

  return await listCache;
}

export async function fetchEvent(eventId: string): Promise<ZwiftEvent> {
  if (listCache) {
    const allEvents = await listCache;
    const eventInList = allEvents.find((e) => e.id.toString() === eventId);
    if (eventInList) {
      return eventInList;
    }
  }

  return api.get<ZwiftEvent>(`/public/events/${eventId}`).then((r) => r.data);
}
