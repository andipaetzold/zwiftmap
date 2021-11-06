import { Request, Response } from "express";
import { Literal, Number, Record, Union, Unknown } from "runtypes";

const WebhookEvent = Record({
  aspect_type: Union(Literal("create"), Literal("update"), Literal("delete")),
  event_time: Number,
  object_id: Number,
  object_type: Union(Literal("activity"), Literal("athlete")),
  owner_id: Number,
  subscription_id: Number,
  updates: Unknown,
});

export function handleWebhook(req: Request, res: Response) {
  const event = req.body;
  if (!WebhookEvent.guard(event)) {
    res.sendStatus(400);
    return;
  }

  if (event.object_type !== "activity" || event.aspect_type !== "create") {
    res.sendStatus(204);
    return;
  }

  res.sendStatus(204);
}
