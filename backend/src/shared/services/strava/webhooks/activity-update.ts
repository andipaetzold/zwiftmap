import { Logger, WebhookEventType } from "../../../types.js";
import { StravaUserAPI } from "../api.js";

export async function handleActivityUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("Evicting activity cache");

  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  await StravaUserAPI.evictCacheForActivity(athleteId, activityId);
}
