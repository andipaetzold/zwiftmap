import { removeStravaFogs } from "../../../../shared/persistence/index.js";
import { removeStravaActivity } from "../../../../shared/persistence/stravaActivity.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";

export async function handleActivityDelete(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;

  logger.info("Removing Strava activity");
  await removeStravaActivity(athleteId, activityId);

  logger.info("Evicting activity cache");
  await CachedStravaUserAPI.evictCacheForActivity(athleteId, activityId);
  await removeStravaFogs(athleteId);
}
