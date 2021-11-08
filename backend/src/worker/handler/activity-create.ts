import * as Sentry from "@sentry/node";
import { DetailedActivity } from "strava";
import { getToken, stravaUserAPI } from "../../shared/services/strava";
import { WebhookEventType } from "../../shared/types";
import { isZwiftActivity } from "../../shared/util";

export async function handleActivityCreate(webhookEvent: WebhookEventType) {
  const accessToken = await getToken(webhookEvent.owner_id);
  if (!accessToken) {
    console.log("Missing strava token");
    return;
  }

  let activity: DetailedActivity;
  try {
    const activityResponse = await stravaUserAPI.get<DetailedActivity>(
      `/activities/${webhookEvent.object_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    activity = activityResponse.data;
  } catch (e) {
    const sentryEventId = Sentry.captureException(e);
    console.log("Error fetching activity", { sentryEventId });
    return;
  }

  if (!isZwiftActivity(activity)) {
    console.log("Not a Zwift activity");
    return;
  }

  console.log("This is a Zwift activity");
}
