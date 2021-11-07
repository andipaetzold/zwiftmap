import { readStravaToken } from "../shared/persistence/stravaToken";
import { activityCreateQueue } from "../shared/queue";
import { stravaUserAPI } from "../shared/services/strava";
import { worlds } from "zwift-data";

interface Activity {
  type: string;
  device_name: string | null;
  start_latlng: [latitude: number, longitude: number] | null;
}

activityCreateQueue.process(async (job, jobDone) => {
  console.log(`Processing WebhookEvent`, {
    jobId: job.id,
    event: job.data,
  });

  const webhookEvent = job.data;

  if (
    webhookEvent.object_type !== "activity" ||
    webhookEvent.aspect_type !== "create"
  ) {
    console.log("Wrong WebhookEvent type");
    jobDone();
    return;
  }

  const token = await readStravaToken(webhookEvent.owner_id);
  if (!token) {
    console.log("Missing strava token");
    jobDone();
    return;
  }

  const activityResponse = await stravaUserAPI.get(
    `/activities/${webhookEvent.object_id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const activity = activityResponse.data;

  if (!isZwiftActivity(activity)) {
    console.log("Not a Zwift activity");
    jobDone();
    return;
  }

  console.log("This is a Zwift activity");

  jobDone();
});

function isZwiftActivity(activity: Activity): boolean {
  if (!["VirtualRun", "VirtualRide"].includes(activity.type)) {
    return false;
  }

  if (activity.device_name !== "Zwift") {
    return false;
  }

  const world = worlds.find((world) => {
    const bb = world.bounds;
    return (
      bb[0][0] >= activity.start_latlng![0] &&
      activity.start_latlng![0] >= bb[1][0] &&
      bb[0][1] <= activity.start_latlng![1] &&
      activity.start_latlng![1] <= bb[1][1]
    );
  });

  if (world === undefined) {
    return false;
  }

  return true;
}
