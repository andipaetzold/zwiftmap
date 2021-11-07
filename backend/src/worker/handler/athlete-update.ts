import { removeStravaToken } from "../../shared/persistence/stravaToken";
import { WebhookEventType } from "../../shared/types";

export async function handleAthleteUpdate(webhookEvent: WebhookEventType) {
  if (webhookEvent.updates["authorized"] === false) {
    console.log("Removing Strava token");
    await removeStravaToken(webhookEvent.object_id);
  }
}
