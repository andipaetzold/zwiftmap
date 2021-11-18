import { DetailedActivity } from "strava";
import { readStravaSettings } from "../../../shared/persistence/stravaSettings";
import { addLinkToActivity } from "../../../shared/services/sharing";
import { getActivityById } from "../../../shared/services/strava";
import { WebhookEventType } from "../../../shared/types";
import { isZwiftActivity } from "../../../shared/util";

export async function handleActivityCreate(webhookEvent: WebhookEventType) {
  const athleteId = webhookEvent.owner_id;
  const activityId = webhookEvent.object_id;
  const settings = await readStravaSettings(athleteId);

  if (!settings.addLinkToActivityDescription) {
    console.log("Setting to add link to activity description is disabled");
    return;
  }

  let activity: DetailedActivity;
  try {
    activity = await getActivityById(athleteId, activityId);
  } catch (e) {
    console.log("Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    console.log("Not a Zwift activity");
    return;
  }

  console.log("Adding link to activity description");
  await addLinkToActivity(athleteId, activityId);
}
