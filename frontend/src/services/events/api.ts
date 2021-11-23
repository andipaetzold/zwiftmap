import axios from "axios";
import { createAxiosCacheAdapter } from "../axios-cache-adapter";
import { ZwiftEvent } from "./types";

const api = axios.create({
  baseURL: "https://us-or-rly101.zwift.com/api",
  adapter: createAxiosCacheAdapter(),
});

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  const response = await api.get<ZwiftEvent[]>("/public/events/upcoming");
  return response.data;
}

export async function fetchEvent(eventId: string): Promise<ZwiftEvent> {
  const response = await api.get<ZwiftEvent>(`/public/events/${eventId}`);
  return response.data;
}
