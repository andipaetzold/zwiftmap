import { routes, Segment, segments, World, worlds } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../constants";
import {
  PATTERN_EVENT,
  PATTERN_NAVIGATION,
  PATTERN_ROUTE_OR_SEGMENT,
  PATTERN_SHARED_ITEM,
  PATTERN_STRAVA_ACTIVITY,
  PATTERN_WORLD,
} from "../routing";
import { DEFAULT_WORLD } from "./constants";
import { createUrl } from "./createUrl";
import { LocationState } from "./types";

const PATTERNS: {
  pattern: RegExp;
  toState: (
    result: RegExpExecArray,
    searchParams: URLSearchParams
  ) => [state: LocationState, updateUrl: boolean];
}[] = [
  {
    pattern: PATTERN_NAVIGATION,
    toState: (result) => {
      const worldSlug = result.groups!.worldSlug;
      const world = worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD;
      return [
        {
          type: "navigation",
          world,
        },
        false,
      ];
    },
  },
  {
    pattern: PATTERN_EVENT,
    toState: (result) => [
      {
        type: "event",
        world: null,
        eventId: result.groups!.eventId,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_SHARED_ITEM,
    toState: (result) => [
      {
        type: "share",
        world: null,
        shareId: result.groups!.shareId,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_STRAVA_ACTIVITY,
    toState: (result) => [
      {
        type: "strava-activity",
        world: null,
        stravaActivityId: +result.groups!.stravaActivityId,
      },
      false,
    ],
  },
  {
    pattern: PATTERN_ROUTE_OR_SEGMENT,
    toState: (result, searchParams) => {
      const worldSlug = result.groups!.worldSlug;
      const route = routes.find(
        (r) => r.slug === result.groups!.routeOrSegmentSlug
      );
      const segment = segments.find(
        (s) => s.slug === result.groups!.routeOrSegmentSlug
      );

      if (segment) {
        const world = WORLDS_BY_SLUG[segment.world];
        return [{ type: "segment", world, segment }, world.slug !== worldSlug];
      }

      if (route) {
        const world = WORLDS_BY_SLUG[route.world];

        const selectedSegments = (searchParams.get("segments") ?? "")
          .split(",")
          .map((slug) => segments.find((s) => s.slug === slug))
          .filter((segment): segment is Segment => !!segment);

        return [
          { type: "route", world, route, segments: selectedSegments },
          world.slug !== worldSlug,
        ];
      }

      return [
        {
          type: "default",
          world: worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD,
        },
        true,
      ];
    },
  },
  {
    pattern: PATTERN_WORLD,
    toState: (result, searchParams) => {
      const worldSlug = result.groups!.worldSlug;
      const world = worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD;

      const fallbackState: LocationState = {
        type: "default",
        world,
      };

      if (searchParams.has("list")) {
        switch (searchParams.get("list")) {
          case "events":
            return [{ type: "events", world }, world.slug !== worldSlug];
          case "strava-activities":
            return [
              { type: "strava-activities", world },
              world.slug !== worldSlug,
            ];
          default:
            return [fallbackState, world.slug !== worldSlug];
        }
      }

      return [getLegacyStateWithWorld(searchParams, world), true];
    },
  },
  {
    pattern: /^(.*)$/,
    toState: (_result, searchParams) => {
      if (searchParams.has("list")) {
        switch (searchParams.get("list")) {
          case "events":
            return [{ type: "events", world: DEFAULT_WORLD }, true];
          case "strava-activities":
            return [{ type: "strava-activities", world: DEFAULT_WORLD }, true];
        }
      }

      return [getLegacyStateWithoutWorld(searchParams), true];
    },
  },
];

function getLegacyStateWithoutWorld(
  searchParams: URLSearchParams
): LocationState {
  const worldSlug = searchParams.get("world");
  const world = worlds.find((w) => w.slug === worldSlug) ?? DEFAULT_WORLD;

  return getLegacyStateWithWorld(searchParams, world);
}

function getLegacyStateWithWorld(
  searchParams: URLSearchParams,
  world: World
): LocationState {
  if (searchParams.has("route")) {
    const route = routes.find((r) => r.slug === searchParams.get("route"));

    if (!route) {
      return { world, type: "default" };
    } else {
      return {
        world: WORLDS_BY_SLUG[route.world],
        type: "route",
        route,
      };
    }
  }

  if (searchParams.has("strava-activities")) {
    return { world, type: "strava-activities" };
  }

  if (searchParams.has("strava-activity")) {
    return {
      world: null,
      type: "strava-activity",
      stravaActivityId: +searchParams.get("strava-activity")!,
    };
  }

  if (searchParams.has("events")) {
    return { world, type: "events" };
  }

  if (searchParams.has("event")) {
    return {
      world: null,
      type: "event",
      eventId: searchParams.get("event")!,
    };
  }

  return { type: "default", world };
}

export function getLocationStateFromUrl(
  pathname = window.location.pathname,
  search = window.location.search
): LocationState {
  let updateUrl = false;
  const searchParams = new URLSearchParams(search);
  let state: LocationState | undefined;
  for (let { pattern, toState } of PATTERNS) {
    const result = pattern.exec(pathname);

    if (result === null) {
      continue;
    }
    const toStateResult = toState(result, searchParams);

    state = toStateResult[0];
    updateUrl = updateUrl || toStateResult[1];

    break;
  }

  if (state === undefined) {
    state = { type: "default", world: DEFAULT_WORLD };
    updateUrl = true;
  }

  if (updateUrl) {
    const url = createUrl(state);
    window.history.replaceState(undefined, "", url);
  }

  return state;
}
