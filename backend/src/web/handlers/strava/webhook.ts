import { Request, Response } from "express";
import {
  Dictionary,
  Literal,
  Number,
  Record,
  StringDictionary,
  Union,
  Unknown,
} from "runtypes";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { activityCreateQueue } from "../../../shared/queue";

const WebhookEvent = Record({
  aspect_type: Union(Literal("create"), Literal("update"), Literal("delete")),
  event_time: Number,
  object_id: Number,
  object_type: Union(Literal("activity"), Literal("athlete")),
  owner_id: Number,
  subscription_id: Number,
  updates: Dictionary(Unknown) as StringDictionary<typeof Unknown>,
});

export async function handleWebhook(req: Request, res: Response) {
  const event = req.body;
  if (!WebhookEvent.guard(event)) {
    res.sendStatus(400);
    return;
  }

  if (
    event.object_type === "athlete" &&
    event.aspect_type === "update" &&
    event.updates["authorized"] === false
  ) {
    await removeStravaToken(event.object_id);
    res.sendStatus(204);
    return;
  }

  if (event.object_type !== "activity" || event.aspect_type !== "create") {
    res.sendStatus(204);
    return;
  }

  await activityCreateQueue.add(event);
  res.sendStatus(204);
}
