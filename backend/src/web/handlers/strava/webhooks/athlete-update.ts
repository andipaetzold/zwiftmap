import { removeStravaAthlete, removeStravaToken } from "../../../../shared/persistence/index.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";

export async function handleAthleteUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  if (webhookEvent.updates["authorized"] === false) {
    const athleteId = webhookEvent.object_id;
    const api = new CachedStravaUserAPI(athleteId);

    logger.info("Removing Strava token");
    await removeStravaToken(athleteId);
    await removeStravaAthlete(athleteId);

    logger.info("Evicting athlete cache");
    await CachedStravaUserAPI.evictCacheForAthlete(athleteId);
  }
}
