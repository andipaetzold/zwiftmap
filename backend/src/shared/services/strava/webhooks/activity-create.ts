import { DetailedActivity } from "strava";
import { readStravaSettings } from "../../../persistence/stravaSettings.js";
import { addLinkToActivity } from "../../sharing.js";
import { CachedStravaUserAPI } from "../cached-api.js";
import { Logger, WebhookEventType } from "../../../types.js";
import { isZwiftActivity } from "../../../util.js";

export async function handleActivityCreate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  const settings = await readStravaSettings(athleteId);

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
