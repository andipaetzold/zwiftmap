import axios from "axios";
import { ZwiftEvent } from "./types";

let cache: Promise<ZwiftEvent[]>;

const api = axios.create({
  baseURL: "https://us-or-rly101.zwift.com/api",
});

export async function fetchEvents(): Promise<ZwiftEvent[]> {
  if (!cache) {
    cache = api
      .get<ZwiftEvent[]>("/public/events/upcoming")
      .then((r) => r.data);
  }

  return await cache;
}
