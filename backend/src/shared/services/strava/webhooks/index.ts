import { Logger, WebhookEventType } from "../../../types.js";
import { handleActivityCreate } from "./activity-create.js";
import { handleActivityDelete } from "./activity-delete.js";
import { handleActivityUpdate } from "./activity-update.js";
import { handleAthleteUpdate } from "./athlete-update.js";

export async function handleStravaWebhookEvent(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info(
    "WebhookEvent",
    `athlete/${webhookEvent.owner_id}/${webhookEvent.object_type}/${webhookEvent.object_id}/${webhookEvent.aspect_type}`
  );

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
