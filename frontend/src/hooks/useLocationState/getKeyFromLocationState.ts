import { LocationState } from "../../types";

export function getKeyFromLocationState(locationState: LocationState): string {
  switch (locationState.type) {
    case "route":
      return [
        locationState.type,
        locationState.route.slug,
        locationState.segments.map((s) => s.slug).join(),
        locationState.world.slug,
        locationState.query,
      ].join();

    case "strava-activities":
      return [
        locationState.type,
        locationState.world.slug,
        locationState.query,
      ].join();

    case "strava-activity":
      return [
        locationState.type,
        locationState.stravaActivityId,
        locationState.world.slug,
        locationState.query,
      ].join();

    case "upcoming-events":
      return [
        locationState.type,
        locationState.world.slug,
        locationState.query,
      ].join();

    case "default":
      return [
        locationState.type,
        locationState.world.slug,
        locationState.query,
      ].join();
  }
}
