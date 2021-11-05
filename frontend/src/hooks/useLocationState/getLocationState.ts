import { routes, Segment, segments, worlds } from "zwift-data";
import { LocationState } from "../../types";
import { DEFAULT_WORLD } from "./constants";

export function getLocationState(): LocationState {
  const searchParams = new URLSearchParams(window.location.search);

  const world =
    worlds.find((w) => w.slug === searchParams.get("world")) ?? DEFAULT_WORLD;
  const query = searchParams.get("q") ?? "";

  if (searchParams.has("route")) {
    const route = routes
      .filter((r) => r.world === world?.slug)
      .find((r) => r.slug === searchParams.get("route"));
    const selectedSegments = (searchParams.get("segments") ?? "")
      .split(",")
      .map((slug) => segments.find((s) => s.slug === slug))
      .filter((segment): segment is Segment => !!segment);

    if (!route) {
      return { world, query, type: "default" };
    } else {
      return {
        world,
        query,
        type: "route",
        route,
        segments: selectedSegments,
      };
    }
  } else if (searchParams.has("strava-activities")) {
    return { world, query, type: "strava-activities" };
  } else if (searchParams.has("strava-activity")) {
    return {
      world,
      query,

      type: "strava-activity",
      stravaActivityId: searchParams.get("strava-activity")!,
    };
  } else {
    return { world, query, type: "default" };
  }
}
