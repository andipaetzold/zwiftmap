import { DetailedActivity } from "strava";
import { readStravaAthlete } from "../../../../shared/persistence/index.js";
import { addLinkToActivity } from "../../../../shared/services/sharing.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";
import { isZwiftActivity } from "../../../../shared/util.js";

export async function handleActivityCreate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  const settings = await readStravaAthlete(athleteId);

  if (!settings.addLinkToActivityDescription) {
    logger.info("Setting to add link to activity description is disabled");
    return;
  }

  let activity: DetailedActivity;
  try {
    const api = new CachedStravaUserAPI(athleteId);
    activity = (await api.getActivityById(activityId)).result;
  } catch (e) {
    logger.info("Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    logger.info("Not a Zwift activity");
    return;
  }

  logger.info("Adding link to activity description");
  await addLinkToActivity(athleteId, activityId, logger);
}
