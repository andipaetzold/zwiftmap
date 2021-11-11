import { DetailedActivity } from "strava";
import { getActivityById } from "../../shared/services/strava";
import { WebhookEventType } from "../../shared/types";
import { isZwiftActivity } from "../../shared/util";

export async function handleActivityCreate(webhookEvent: WebhookEventType) {
  let activity: DetailedActivity;
  try {
    activity = await getActivityById(
      webhookEvent.owner_id,
      webhookEvent.object_id
    );
  } catch (e) {
    console.log("Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    console.log("Not a Zwift activity");
    return;
  }

  console.log("This is a Zwift activity");
}
