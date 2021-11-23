import { evictCacheForActivity } from "../../../shared/services/strava";
import { WebhookEventType } from "../../../shared/types";
import { Logger } from "../../services/logger";

export async function handleActivityUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  logger.info("Evicting activity cache");

  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  await evictCacheForActivity(athleteId, activityId);
}
