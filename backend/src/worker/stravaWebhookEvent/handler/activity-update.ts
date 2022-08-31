import { evictCacheForActivity } from "../../../shared/services/strava";
import { Logger, WebhookEventType } from "../../../shared/types";

export async function handleActivityUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("Evicting activity cache");

  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  await evictCacheForActivity(athleteId, activityId);
}
