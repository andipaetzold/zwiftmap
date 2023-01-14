import { World } from "zwift-data";
import { LocationState } from "./types";

export function getKeyFromLocationState(locationState: LocationState): string {
  switch (locationState.type) {
    case "route":
      return [
        locationState.type,
        locationState.route.slug,
        getKeyFromWorld(locationState.world),
      ].join();

    case "segment":
      return [
        locationState.type,
        locationState.segment.slug,
        getKeyFromWorld(locationState.world),
      ].join();

    case "strava-activities":
      return [locationState.type, getKeyFromWorld(locationState.world)].join();

    case "strava-activity":
      return [
        locationState.type,
        locationState.stravaActivityId,
        getKeyFromWorld(locationState.world),
      ].join();

    case "events":
      return [locationState.type, getKeyFromWorld(locationState.world)].join();

    case "event":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.eventId,
      ].join();

    case "share":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.shareId,
      ].join();

    case "place":
    case "place-edit":
      return [
        locationState.type,
        getKeyFromWorld(locationState.world),
        locationState.placeId,
      ].join();

    case "custom-route":
    case "fog":
    case "place-new":
    case "default":
      return [locationState.type, getKeyFromWorld(locationState.world)].join();
  }
}

export function getKeyFromWorld(world: World | null) {
  if (world === null) {
    return "loading";
  } else {
    return world.slug;
  }
}
