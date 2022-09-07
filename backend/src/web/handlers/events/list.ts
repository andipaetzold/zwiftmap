import { Request, Response } from "express";
import { getEvents } from "../../../shared/events/index.js";

export async function handleGETEvents(_req: Request, res: Response) {
  const { result: events, ttl } = await getEvents();

  res
    .status(200)
    .header("Cache-Control", `public, max-age=${ttl}`)
    .json(events);
}
