import axios from "axios";
import { ZwiftEvent } from "./types.js";

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
