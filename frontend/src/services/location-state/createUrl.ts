import { LocationState } from "./types";

export function createUrl(state: LocationState): string {
  let path = "/";
  const searchParams = new URLSearchParams();

  switch (state.type) {
    case "navigation":
    case "default":
      path = `/${state.world.slug}`;
      break;

    case "route":
      path = `/${state.world.slug}/${state.route.slug}`;
      break;

    case "segment":
      path = `/${state.world.slug}/${state.segment.slug}`;
      break;

    case "strava-activities":
      path = `/${state.world.slug}`;
      searchParams.set("list", "strava-activities");
      break;

    case "strava-activity":
      path = `/strava-activities/${state.stravaActivityId}`;
      break;

    case "events":
      path = `/${state.world.slug}`;
      searchParams.set("list", "events");
      break;

    case "event":
      path = `/events/${state.eventId}`;
      break;

    case "share":
      path = `/s/${state.shareId}`;
      break;
  }

  const searchParamsString = searchParams.toString();

  if (searchParamsString === "") {
    return path;
  } else {
    return `${path}?${searchParamsString}`;
  }
}
