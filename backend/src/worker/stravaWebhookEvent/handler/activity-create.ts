import { DetailedActivity } from "strava";
import { readStravaSettings } from "../../../shared/persistence/stravaSettings";
import { addLinkToActivity } from "../../../shared/services/sharing";
import { getActivityById } from "../../../shared/services/strava";
import { Logger, WebhookEventType } from "../../../shared/types";
import { isZwiftActivity } from "../../../shared/util";

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
    activity = (await getActivityById(athleteId, activityId)).result;
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
