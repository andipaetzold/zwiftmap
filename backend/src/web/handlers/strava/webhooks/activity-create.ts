import {
  readStravaAthlete,
  removeStravaFog,
  writeStravaActivity,
} from "../../../../shared/persistence/index.js";
import {
  CachedStravaUserAPI,
  DetailedActivity,
} from "../../../../shared/services/strava/index.js";
import { Logger, WebhookEventType } from "../../../../shared/types.js";
import {
  getWorldFromActivity,
  isZwiftActivity,
} from "../../../../shared/util.js";

export async function handleActivityCreate(
  webhookEvent: WebhookEventType,
  logger: Logger
) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  const settings = await readStravaAthlete(athleteId);

  if (!settings.addLinkToActivityDescription && !settings.persistActivities) {
    return;
  }

  let activity: DetailedActivity;
  try {
    const api = new CachedStravaUserAPI(athleteId);
    activity = (await api.getActivityById(activityId)).result;
  } catch (e) {
    logger.error("Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    logger.info("Not a Zwift activity");
    return;
  }

  // if (settings.addLinkToActivityDescription) {
  //   logger.info("Adding link to activity description");
  //   await addLinkToActivity(athleteId, activityId, logger);
  // }

  if (settings.persistActivities) {
    logger.info("Writing Strava Activity");
    await writeStravaActivity(athleteId, activity);
  }

  await removeStravaFog(athleteId, getWorldFromActivity(activity)!.slug);
}
