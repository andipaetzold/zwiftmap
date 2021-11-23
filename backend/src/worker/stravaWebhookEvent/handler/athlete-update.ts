import { removeStravaSettings } from "../../../shared/persistence/stravaSettings";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { evictCacheForAthlete } from "../../../shared/services/strava";
import { WebhookEventType } from "../../../shared/types";
import { Logger } from "../../services/logger";

export async function handleAthleteUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  if (webhookEvent.updates["authorized"] === false) {
    const athleteId = webhookEvent.object_id;

    logger.info("Removing Strava token");
    await removeStravaToken(athleteId);
    await removeStravaSettings(athleteId);

    logger.info("Evicting athlete cache");
    await evictCacheForAthlete(athleteId);
  }
}
