import { Request, Response } from "express";
import { getEvents } from "../../../shared/events";

export async function handleGETEvents(_req: Request, res: Response) {
  const events = await getEvents();

  res.status(200).json(events);
}
