import { routes, Segment, segments, World, worlds } from "zwift-data";
import { DEFAULT_WORLD } from "./constants";
import { createUrl } from "./createUrl";
import { LocationState } from "./types";
import {
  PATTERN_SHARED_ITEM,
  PATTERN_ROUTE,
  PATTERN_STRAVA_ACTIVITY,
  PATTERN_WORLD,
  PATTERN_EVENT,
} from "../routing";

const PATTERNS: {
  pattern: RegExp;
  toState: (
    result: RegExpExecArray,
    searchParams: URLSearchParams,
    query: string
  ) => [state: LocationState, updateUrl: boolean];
}[] = [
  {
    pattern: PATTERN_EVENT,
    toState: (result, _searchParams, query) => [
      {
        type: "event",
        world: null,
        eventId: result.groups!.eventId,
        query,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_SHARED_ITEM,
    toState: (result, _searchParams, query) => [
      {
        type: "shared-item",
        world: null,
        sharedItemId: result.groups!.sharedItemId,
        query,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_STRAVA_ACTIVITY,
    toState: (result, _searchParams, query) => [
      {
        type: "strava-activity",
        world: null,
        stravaActivityId: +result.groups!.stravaActivityId,
        query,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_ROUTE,
    toState: (result, searchParams, query) => {
      const worldSlug = result.groups!.worldSlug;
      const route = routes.find((r) => r.slug === result.groups!.routeSlug);
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
    pattern: PATTERN_WORLD,
    toState: (result, searchParams, query) => {
      const worldSlug = result.groups!.worldSlug;
      const world = worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD;

      const fallbackState: LocationState = {
        type: "default",
        world,
        query,
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

      return [getLegacyStateWithWorld(searchParams, world, query), true];
    },
  },
  {
    pattern: /^(.*)$/,
    toState: (_result, searchParams, query) => {
      if (searchParams.has("list")) {
        switch (searchParams.get("list")) {
          case "events":
            return [{ type: "events", world: DEFAULT_WORLD, query }, true];
          case "strava-activities":
            return [
              { type: "strava-activities", world: DEFAULT_WORLD, query },
              true,
            ];
        }
      }

      return [getLegacyStateWithoutWorld(searchParams, query), true];
    },
  },
];

function getLegacyStateWithoutWorld(
  searchParams: URLSearchParams,
  query: string
): LocationState {
  const worldSlug = searchParams.get("world");
  const world = worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD;

  return getLegacyStateWithWorld(searchParams, world, query);
}

function getLegacyStateWithWorld(
  searchParams: URLSearchParams,
  world: World,
  query: string
): LocationState {
  if (searchParams.has("route")) {
    const route = routes.find((r) => r.slug === searchParams.get("route"));
    const selectedSegments = (searchParams.get("segments") ?? "")
      .split(",")
      .map((slug) => segments.find((s) => s.slug === slug))
      .filter((segment): segment is Segment => !!segment);

    if (!route) {
      return { world, query, type: "default" };
    } else {
      return {
        world: worlds.find((w) => w.slug === route.world)!,
        query,
        type: "route",
        route,
        segments: selectedSegments,
      };
    }
  }

  if (searchParams.has("strava-activities")) {
    return { world, query, type: "strava-activities" };
  }

  if (searchParams.has("strava-activity")) {
    return {
      world: null,
      query,
      type: "strava-activity",
      stravaActivityId: +searchParams.get("strava-activity")!,
    };
  }

  if (searchParams.has("events")) {
    return { world, query, type: "events" };
  }

  if (searchParams.has("event")) {
    return {
      world: null,
      query,
      type: "event",
      eventId: searchParams.get("event")!,
    };
  }

  return { type: "default", world, query };
}

export function getLocationStateFromUrl(
  pathname = window.location.pathname,
  search = window.location.search
): LocationState {
  for (let { pattern, toState } of PATTERNS) {
    const result = pattern.exec(pathname);

    if (result === null) {
      continue;
    }
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("q") ?? "";
    const [state, updateUrl] = toState(result, searchParams, query);

    if (updateUrl) {
      const url = createUrl(state);
      window.history.replaceState(undefined, "", url);
    }

    return state;
  }

  return { type: "default", world: DEFAULT_WORLD, query: "" };
}
