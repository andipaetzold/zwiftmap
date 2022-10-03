import { Request, Response } from "express";
import { handleStravaWebhookEvent } from "../../../shared/services/strava/index.js";
import { WebhookEvent } from "../../../shared/types.js";
import { getWebhookSubscriptionId } from "../../state.js";

export async function handleWebhook(req: Request, res: Response) {
  const webhookEvent = req.body;
  if (!WebhookEvent.guard(webhookEvent)) {
    res.sendStatus(400);
    return;
  }

  const webhookSubscriptionId = getWebhookSubscriptionId();
  if (webhookSubscriptionId === undefined) {
    console.warn("Webhooks are not ready yet");
    res.sendStatus(503);
    return;
  }

  if (webhookEvent.subscription_id !== webhookSubscriptionId) {
    console.warn("Wrong subscription id");
    res.sendStatus(403);
    return;
  }

  await handleStravaWebhookEvent(webhookEvent, req.log);

  res.sendStatus(204);
}
