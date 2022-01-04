import { cachedRequest } from "../cached-request";
import { ZwiftEvent } from "./types";

const BASE_URL = "https://us-or-rly101.zwift.com/api";

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  return await cachedRequest(`${BASE_URL}/public/events/upcoming`);
}

export async function fetchEvent(eventId: string): Promise<ZwiftEvent> {
  return await cachedRequest(`${BASE_URL}/public/events/${eventId}`);
}
