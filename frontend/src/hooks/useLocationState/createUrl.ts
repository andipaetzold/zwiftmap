import { LocationState } from "../../types";

export function createUrl(state: LocationState): string {
  const path = `/${state.world.slug}`;

  const searchParams = new URLSearchParams();

  switch (state.type) {
    case "default":
      break;
    case "route":
      searchParams.set("route", state.route.slug);
      if (state.segments.length > 0) {
        searchParams.set(
          "segments",
          state.segments.map((s) => s.slug).join(",")
        );
      }
      break;

    case "strava-activities":
      searchParams.set("strava-activities", "");
      break;

    case "strava-activity":
      searchParams.set("strava-activity", state.stravaActivityId);
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
