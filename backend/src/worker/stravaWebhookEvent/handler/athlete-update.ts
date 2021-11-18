import { removeStravaSettings } from "../../../shared/persistence/stravaSettings";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { WebhookEventType } from "../../../shared/types";

export async function handleAthleteUpdate(webhookEvent: WebhookEventType) {
  if (webhookEvent.updates["authorized"] === false) {
    console.log("Removing Strava token");
    await removeStravaToken(webhookEvent.object_id);
    await removeStravaSettings(webhookEvent.object_id);
  }
}
