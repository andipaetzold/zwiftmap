import { URLPattern, URLPatternResult } from "urlpattern-polyfill";
import { routes, Segment, segments, worlds } from "zwift-data";
import { DEFAULT_WORLD } from "./constants";
import { createUrl } from "./createUrl";
import { LocationState } from "./types";

const PATTERNS: {
  pattern: any;
  toState: (
    result: URLPatternResult,
    query: string
  ) => [state: LocationState, updateUrl: boolean];
}[] = [
  {
    pattern: new URLPattern({ pathname: "/events/:eventId" }),
    toState: (result, query) => [
      {
        type: "event",
        world: null,
        eventId: result.pathname.groups.eventId,
        query,
      },
      false,
    ],
  },
  {
    pattern: new URLPattern({
      pathname: "/strava-activities/:stravaActivityId",
    }),
    toState: (result, query) => [
      {
        type: "strava-activity",
        world: null,
        stravaActivityId: result.pathname.groups.stravaActivityId,
        query,
      },
      false,
    ],
  },
  {
    pattern: new URLPattern({
      pathname: "/:worldSlug/:routeSlug",
    }),
    toState: (result, query) => {
      const worldSlug = result.pathname.groups.worldSlug;
      const route = routes.find(
        (r) => r.slug === result.pathname.groups.routeSlug
      );
      if (!route) {
        return [
          {
            type: "default",
            world: worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD,
            query,
          },
          true,
        ];
      }

      const world = worlds.find((w) => w.slug === route.world)!;

      const searchParams = new URLSearchParams(result.search.input);

      const selectedSegments = (searchParams.get("segments") ?? "")
        .split(",")
        .map((slug) => segments.find((s) => s.slug === slug))
        .filter((segment): segment is Segment => !!segment);

      return [
        { type: "route", world, route, segments: selectedSegments, query },
        world.slug !== worldSlug,
      ];
    },
  },
  {
    pattern: new URLPattern({
      pathname: "/*?",
    }),
    toState: (result, query) => {
      const searchParams = new URLSearchParams(result.search.input);
      const worldSlug = result.pathname.groups[0];
      const world =
        worlds.find((w) => w.slug === result.pathname.groups[0]) ??
        DEFAULT_WORLD;

      const fallbackState: LocationState = {
        type: "default",
        world,
        query: "",
      };

      if (searchParams.has("list")) {
        switch (searchParams.get("list")) {
          case "events":
            return [{ type: "events", world, query }, world.slug !== worldSlug];
          case "strava-activities":
            return [
              { type: "strava-activities", world, query },
              world.slug !== worldSlug,
            ];
          default:
            return [fallbackState, world.slug !== worldSlug];
        }
      }

      if (searchParams.has("route")) {
        const route = routes.find((r) => r.slug === searchParams.get("route"));
        const selectedSegments = (searchParams.get("segments") ?? "")
          .split(",")
          .map((slug) => segments.find((s) => s.slug === slug))
          .filter((segment): segment is Segment => !!segment);

        if (!route) {
          return [{ world, query, type: "default" }, world.slug !== worldSlug];
        } else {
          return [
            {
              world: worlds.find((w) => w.slug === route.world)!,
              query,
              type: "route",
              route,
              segments: selectedSegments,
            },
            route.world !== result.pathname.groups.worldSlug,
          ];
        }
      }

      if (searchParams.has("strava-activities")) {
        return [
          { world, query, type: "strava-activities" },
          world.slug !== worldSlug,
        ];
      }

      if (searchParams.has("strava-activity")) {
        return [
          {
            world: null,
            query,
            type: "strava-activity",
            stravaActivityId: searchParams.get("strava-activity")!,
          },
          true,
        ];
      }

      if (searchParams.has("events")) {
        return [{ world, query, type: "events" }, world.slug !== worldSlug];
      }

      if (searchParams.has("event")) {
        return [
          {
            world: null,
            query,
            type: "event",
            eventId: searchParams.get("event")!,
          },
          true,
        ];
      }

      return [fallbackState, world.slug !== worldSlug];
    },
  },
];

export function getLocationStateFromHistory(
  location: Pick<Location, "pathname" | "search"> = window.location
): LocationState {
  for (let { pattern, toState } of PATTERNS) {
    const result = pattern.exec(location);
    if (result === null) {
      continue;
    }
    const query = new URLSearchParams(result.search.input).get("q") ?? "";
    const [state, updateUrl] = toState(result, query);

    if (updateUrl) {
      const url = createUrl(state);
      window.history.replaceState(undefined, "", url);
    }

    return state;
  }

  return { type: "default", world: DEFAULT_WORLD, query: "" };
}
