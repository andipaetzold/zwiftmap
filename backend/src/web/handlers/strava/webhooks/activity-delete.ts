import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";

export async function handleActivityDelete(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("Evicting activity cache");
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  await CachedStravaUserAPI.evictCacheForActivity(athleteId, activityId);
}
