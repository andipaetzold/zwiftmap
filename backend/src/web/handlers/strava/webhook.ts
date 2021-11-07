import { Request, Response } from "express";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { stravaWebhookEventQueue } from "../../../shared/queue";
import { WebhookEvent } from "../../../shared/types";

export async function handleWebhook(req: Request, res: Response) {
  const webhookEvent = req.body;
  if (!WebhookEvent.guard(webhookEvent)) {
    res.sendStatus(400);
    return;
  }

  if (
    webhookEvent.object_type === "athlete" &&
    webhookEvent.aspect_type === "update" &&
    webhookEvent.updates["authorized"] === false
  ) {
    await removeStravaToken(webhookEvent.object_id);
    res.sendStatus(204);
    return;
  }

  if (
    webhookEvent.object_type !== "activity" ||
    webhookEvent.aspect_type !== "create"
  ) {
    res.sendStatus(204);
    return;
  }

  await stravaWebhookEventQueue.add(webhookEvent);
  res.sendStatus(204);
}
