import { DetailedActivity, Strava } from "strava";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../../shared/config";
import { readStravaToken } from "../../shared/persistence/stravaToken";
import { WebhookEventType } from "../../shared/types";
import { isZwiftActivity } from "../../shared/util";

interface Activity {
  type: string;
  device_name: string | null;
  start_latlng: [latitude: number, longitude: number] | null;
}

export async function handleActivityCreate(webhookEvent: WebhookEventType) {
  const token = await readStravaToken(webhookEvent.owner_id);
  if (!token) {
    console.log("Missing strava token");
    return;
  }

  const client = new Strava({
    client_id: STRAVA_CLIENT_ID.toString(),
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: token.refreshToken,
  });

  let activity: DetailedActivity;
  try {
    activity = await client.activities.getActivityById({
      id: webhookEvent.object_id,
    });
  } catch {
    console.log("Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    console.log("Not a Zwift activity");
    return;
  }

  console.log("This is a Zwift activity");
}
