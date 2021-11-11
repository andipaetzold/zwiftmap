import { LocationState } from "./types";

export function createUrl(state: LocationState): string {
  let path = "/";
  const searchParams = new URLSearchParams();

  switch (state.type) {
    case "default":
      path = `/${state.world.slug}`;
      break;
    case "route":
      path = `/${state.world.slug}/${state.route.slug}`;
      if (state.segments.length > 0) {
        searchParams.set(
          "segments",
          state.segments.map((s) => s.slug).join(",")
        );
      }
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

    case "shared-item":
      path = `/s/${state.sharedItemId}`;
      break;
  }

  if (state.query.length > 0) {
    searchParams.set("q", state.query);
  }

  const searchParamsString = searchParams.toString();

  if (searchParamsString === "") {
    return path;
  } else {
    return `${path}?${searchParamsString}`;
  }
}
