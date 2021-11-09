import { routes, Segment, segments, World, worlds } from "zwift-data";
import { LocationState } from "../../types";
import { DEFAULT_WORLD } from "./constants";

export function getLocationState(
  { search, pathname }: Pick<Location, "pathname" | "search"> = window.location
): LocationState {
  const searchParams = new URLSearchParams(search);

  const world = getWorld({ searchParams, pathname });
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
  } else if (searchParams.has("events")) {
    return { world, query, type: "events" };
  } else if (searchParams.has("event")) {
    return {
      world,
      query,
      type: "event",
      eventId: searchParams.get("event")!,
    };
  } else {
    return { world, query, type: "default" };
  }
}

function getWorld({
  searchParams,
  pathname,
}: {
  searchParams: URLSearchParams;
  pathname: string;
}): World {
  const pathParts = pathname.split("/").slice(1);

  const worldFromPath = worlds.find((w) => w.slug === pathParts[0]);
  const worldFromSearch = worlds.find(
    (w) => w.slug === searchParams.get("world")
  );

  return worldFromPath ?? worldFromSearch ?? DEFAULT_WORLD;
}
