import { removeStravaSettings } from "../../../shared/persistence/stravaSettings";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { WebhookEventType } from "../../../shared/types";
import { Logger } from "../../services/logger";

export async function handleAthleteUpdate(webhookEvent: WebhookEventType, logger: Logger) {
  if (webhookEvent.updates["authorized"] === false) {
    logger.log("Removing Strava token");
    await removeStravaToken(webhookEvent.object_id);
    await removeStravaSettings(webhookEvent.object_id);
  }
}
