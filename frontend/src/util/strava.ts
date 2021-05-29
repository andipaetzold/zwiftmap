import { worlds } from "../data";
import { DetailedActivity } from "../services/strava/types";
import { World } from "../types";
import { worldConfigs } from "../worldConfig";

export function getWorld(activity: DetailedActivity): World | undefined {
  return worlds.find((world) => {
    const worldConfig = worldConfigs[world.slug];
    const bb = worldConfig.imageBounds;
    return (
      bb[0][0] >= activity.start_latlng[0] &&
      activity.start_latlng[0] >= bb[1][0] &&
      bb[0][1] <= activity.start_latlng[1] &&
      activity.start_latlng[1] <= bb[1][1]
    );
  });
}
