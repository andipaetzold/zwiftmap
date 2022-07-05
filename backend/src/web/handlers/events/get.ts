import { Request, Response } from "express";
import { getEvent } from "../../../shared/events";

export async function handleGETEvent(req: Request, res: Response) {
  const { result: event, ttl } = await getEvent(+req.params.eventId);

  res.status(200).header("Cache-Control", `public, max-age=${ttl}`).json(event);
}
