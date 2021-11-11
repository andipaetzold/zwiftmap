import { World } from "zwift-data";
import { LocationState } from "./types";

export function getKeyFromLocationState(locationState: LocationState): string {
  switch (locationState.type) {
    case "route":
      return [
        locationState.type,
        locationState.route.slug,
        getKeyFromWorld(locationState.world),
        locationState.query,
      ].join();

    case "strava-activities":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.query,
      ].join();

    case "strava-activity":
      return [
        locationState.type,
        locationState.stravaActivityId,
        getKeyFromWorld(locationState.world),
        locationState.query,
      ].join();

    case "events":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.query,
      ].join();

    case "event":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.eventId,
        locationState.query,
      ].join();

      case 'shared-item':
        return [
          locationState.type,
          getKeyFromWorld(locationState.world),
          locationState.sharedItemId,
          locationState.query
        ].join()

    case "default":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.query,
      ].join();
  }
}

export function getKeyFromWorld(world: World | null) {
  if (world === null) {
    return "loading";
  } else {
    return world.slug;
  }
}
