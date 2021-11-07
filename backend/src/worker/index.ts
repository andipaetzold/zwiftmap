import { AxiosResponse } from "axios";
import { worlds } from "zwift-data";
import { readStravaToken } from "../shared/persistence/stravaToken";
import { uploadStravaActivityMapQueue } from "../shared/queue";
import { stravaUserAPI } from "../shared/services/strava";

interface Activity {
  type: string;
  device_name: string | null;
  start_latlng: [latitude: number, longitude: number] | null;
}

uploadStravaActivityMapQueue.process(async (job, jobDone) => {
  console.log(`Processing`, {
    jobId: job.id,
    data: job.data,
  });

  const data = job.data;

  const token = await readStravaToken(data.athleteId);
  if (!token) {
    console.log("Missing strava token");
    jobDone();
    return;
  }

  let activityResponse: AxiosResponse<any>;
  try {
    activityResponse = await stravaUserAPI.get(
      `/activities/${data.activityId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch {
    console.log("Error fetching activity");
    jobDone();
    return;
  }

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
