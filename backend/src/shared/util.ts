import { DetailedActivity, LatLng, SummaryActivity } from "strava";
import { World, worlds } from "zwift-data";

export function isZwiftActivity(
  activity: DetailedActivity | SummaryActivity
): boolean {
  if (!["VirtualRun", "VirtualRide"].includes(activity.type)) {
    return false;
  }

  if ("device_name" in activity && activity.device_name !== "Zwift") {
    return false;
  }

  const world = getWorld(activity);

  if (world === undefined) {
    return false;
  }

  return true;
}

export function getWorld(activity: {
  start_latlng: LatLng;
}): World | undefined {
  return worlds.find((world) => {
    const bb = world.bounds;
    return (
      bb[0][0] >= activity.start_latlng![0] &&
      activity.start_latlng![0] >= bb[1][0] &&
      bb[0][1] <= activity.start_latlng![1] &&
      activity.start_latlng![1] <= bb[1][1]
    );
  });
}

export function diff(a: number, b: number) {
  return Math.abs(a - b);
}
