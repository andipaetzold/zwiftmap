import { LatLngTuple } from "leaflet";
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
      if (state.subgroupLabel) {
        path += `/${state.subgroupLabel}`;
      }
      break;

    case "share":
      path = `/s/${state.shareId}`;
      break;

    case "custom-route":
      path = `/${state.world.slug}/custom-route`;
      const nonNullPoints = state.points.filter(
        (p): p is LatLngTuple => p !== null,
      );
      if (nonNullPoints.length > 0) {
        searchParams.set(
          "points",
          nonNullPoints
            .map((point) => point.map((x) => x.toString()).join(","))
            .join("!"),
        );
      }
      break;

    case "fog":
      path = `/${state.world.slug}/fog`;
      break;

    case "place-new":
      path = `/${state.world.slug}/places/new`;
      break;

    case "place":
      path = `/${state.world.slug}/places/${state.placeId}`;
      break;

    case "place-edit":
      path = `/${state.world.slug}/places/${state.placeId}/edit`;
      break;
  }

  const searchParamsString = searchParams.toString();

  if (searchParamsString === "") {
    return path;
  } else {
    return `${path}?${searchParamsString}`;
  }
}
