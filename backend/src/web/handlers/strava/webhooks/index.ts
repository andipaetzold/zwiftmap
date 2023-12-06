import { Request, Response } from "express";
import {
  Logger,
  WebhookEvent,
  WebhookEventType,
} from "../../../../shared/types.js";
import { handleActivityCreate } from "./activity-create.js";
import { handleActivityDelete } from "./activity-delete.js";
import { handleActivityUpdate } from "./activity-update.js";
import { handleAthleteUpdate } from "./athlete-update.js";

export async function handleWebhook(req: Request, res: Response) {
  const webhookEvent = req.body;
  if (!WebhookEvent.guard(webhookEvent)) {
    res.sendStatus(400);
    return;
  }

  await handleStravaWebhookEvent(webhookEvent, req.log);

  res.sendStatus(204);
}

async function handleStravaWebhookEvent(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("WebhookEvent", webhookEvent);

  switch (webhookEvent.object_type) {
    case "athlete": {
      switch (webhookEvent.aspect_type) {
        case "update":
          await handleAthleteUpdate(webhookEvent, logger);
          break;
      }
      break;
    }
    case "activity": {
      switch (webhookEvent.aspect_type) {
        case "create":
          await handleActivityCreate(webhookEvent, logger);
          break;
        case "update":
          await handleActivityUpdate(webhookEvent, logger);
          break;
        case "delete":
          await handleActivityDelete(webhookEvent, logger);
      }

      break;
    }
  }
}
