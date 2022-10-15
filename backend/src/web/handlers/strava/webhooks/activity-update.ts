import { writeStravaActivity } from "../../../../shared/persistence/index.js";
import {
  CachedStravaUserAPI,
  DetailedActivity,
  isStravaBetaUser,
} from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";
import { isZwiftActivity } from "../../../../shared/util.js";

export async function handleActivityUpdate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;

  // TODO: update share

  if (isStravaBetaUser(athleteId)) {
    let activity: DetailedActivity;
    try {
      const api = new CachedStravaUserAPI(athleteId);
      activity = (await api.getActivityById(activityId)).result;
    } catch (e) {
      logger.error("Error fetching activity");
      return;
    }

    if (!isZwiftActivity(activity)) {
      return;
    }

    logger.info("Updating Strava Activity");
    await writeStravaActivity(athleteId, activity);
  }

  logger.info("Evicting activity cache");
  await CachedStravaUserAPI.evictCacheForActivity(athleteId, activityId);
}
