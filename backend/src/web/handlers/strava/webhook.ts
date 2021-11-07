import { Request, Response } from "express";
import { stravaWebhookEventQueue } from "../../../shared/queue";
import { WebhookEvent } from "../../../shared/types";

export async function handleWebhook(req: Request, res: Response) {
  const webhookEvent = req.body;
  if (!WebhookEvent.guard(webhookEvent)) {
    res.sendStatus(400);
    return;
  }

  const job = await stravaWebhookEventQueue.add(webhookEvent);
  console.log(`Equeued job ${job.id}`);
  res.sendStatus(204);
}
