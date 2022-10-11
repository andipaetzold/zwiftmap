import {
  removeStravaAthlete,
  removeStravaToken,
} from "../../../../shared/persistence/index.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";

export async function handleAthleteUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  if (webhookEvent.updates["authorized"] === false) {
    const athleteId = webhookEvent.object_id;

    logger.info("Removing Strava token");
    await removeStravaToken(athleteId);
    await removeStravaAthlete(athleteId); // deletes all activities as well

    logger.info("Evicting athlete cache");
    await CachedStravaUserAPI.evictCacheForAthlete(athleteId);
  }
}
