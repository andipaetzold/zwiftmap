import { World, worlds } from "zwift-data";
import { DetailedActivity, SummaryActivity } from "../services/strava/types";

export function getWorld(
  activity: DetailedActivity | SummaryActivity
): World | undefined {
  if (activity.start_latlng === null) {
    return;
  }

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
