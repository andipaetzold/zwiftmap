import { Request, Response } from "express";
import { handleStravaWebhookEvent } from "../../../shared/services/strava/index.js";
import { WebhookEvent } from "../../../shared/types.js";

export async function handleWebhook(req: Request, res: Response) {
  const webhookEvent = req.body;
  if (!WebhookEvent.guard(webhookEvent)) {
    res.sendStatus(400);
    return;
  }

  await handleStravaWebhookEvent(webhookEvent, req.log);

  res.sendStatus(204);
}
