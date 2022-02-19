import { Request, Response } from "express";
import { getEvent } from "../../../shared/events";

export async function handleGETEvent(req: Request, res: Response) {
  const event = await getEvent(+req.params.eventId);

  res.status(200).json(event);
}
