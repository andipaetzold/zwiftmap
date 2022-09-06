import { Logger, WebhookEventType } from "../../shared/types";
import { handleActivityCreate } from "./handler/activity-create";
import { handleActivityDelete } from "./handler/activity-delete";
import { handleActivityUpdate } from "./handler/activity-update";
import { handleAthleteUpdate } from "./handler/athlete-update";

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
