import { default as axios } from "axios";
import { ZwiftEvent } from "./types.js";

// @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
const api = axios.create({
  baseURL: "https://us-or-rly101.zwift.com/api",
});

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  const response = await api.get<ZwiftEvent[]>("/public/events/upcoming");
  return response.data;
}

export async function fetchEvent(eventId: number): Promise<ZwiftEvent> {
  const response = await api.get<ZwiftEvent>(`/public/events/${eventId}`);
  return response.data;
}
