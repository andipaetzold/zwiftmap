import { Logger, WebhookEventType } from "../../../types.js";
import { evictCacheForActivity } from "../cached-api.js";

export async function handleActivityDelete(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("Evicting activity cache");
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  await evictCacheForActivity(athleteId, activityId);
}
