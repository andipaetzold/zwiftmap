import {
  removeStravaAthlete,
  removeStravaToken,
} from "../../../persistence/index.js";
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
    await removeStravaAthlete(athleteId);

    logger.info("Evicting athlete cache");
    await CachedStravaUserAPI.evictCacheForAthlete(athleteId);
  }
}
