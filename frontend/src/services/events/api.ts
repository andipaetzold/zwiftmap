import { createFetchCache } from "../fetch-cache";
import { ZwiftEvent } from "./types";

const BASE_URL = "https://us-or-rly101.zwift.com/api";
const api = createFetchCache(fetch);

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  return await api(`${BASE_URL}/public/events/upcoming`);
}

export async function fetchEvent(eventId: string): Promise<ZwiftEvent> {
  return await api(`${BASE_URL}/public/events/${eventId}`);
}
