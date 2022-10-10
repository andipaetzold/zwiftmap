import { removeStravaSettings } from "../../../persistence/stravaSettings.js";
import { removeStravaToken } from "../../../persistence/stravaToken.js";
import { Logger, WebhookEventType } from "../../../types.js";
import { CachedStravaUserAPI } from "../cached-api.js";

export async function handleAthleteUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  if (webhookEvent.updates["authorized"] === false) {
    const athleteId = webhookEvent.object_id;
    const api = new CachedStravaUserAPI(athleteId);

    logger.info("Removing Strava token");
    await removeStravaToken(athleteId);
    await removeStravaSettings(athleteId);

    logger.info("Evicting athlete cache");
    await CachedStravaUserAPI.evictCacheForAthlete(athleteId);
  }
}
