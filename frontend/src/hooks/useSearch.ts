import { useMemo } from "react";
import {
  Route,
  routes,
  Segment,
  segments,
  Sport,
  World,
  worlds,
} from "zwift-data";
import { WORLDS_BY_SLUG } from "../constants";
import { Place } from "../types";

const REGEX_STRAVA_ACTIVITY = /strava\.com\/activities\/(\d{10})/;

export type SearchResult =
  | SearchResultWorld
  | SearchResultRoute
  | SearchResultSegment
  | SearchResultPlace
  | SearchResultStravaActivity;

export interface SearchResultWorld {
  type: "world";
  terms: string[];
  data: World;
}

export interface SearchResultRoute {
  type: "route";
  terms: string[];
  data: Route;
}

export interface SearchResultSegment {
  type: "segment";
  terms: string[];
  data: Segment;
}

export interface SearchResultPlace {
  type: "place";
  terms: string[];
  data: Place;
}

export interface SearchResultStravaActivity {
  type: "strava-activity";
  data: {
    slug: string;
    activityId: number;
  };
}

const searchResultsWorld = [...worlds]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((world) => ({
    type: "world" as const,
    terms: [world.name].map((t) => t.toLocaleLowerCase()),
    data: world,
  }));
const searchResultsRoute = routes
  .filter((route) => route.stravaSegmentId !== undefined)
  .map((route) => ({
    type: "route" as const,
    terms: [WORLDS_BY_SLUG[route.world].name, route.name].map((t) =>
      t.toLocaleLowerCase()
    ),
    data: route,
  }));
const searchResultsSegment = segments
  .filter((segment) => segment.stravaSegmentId !== undefined)
  .map((segment) => ({
    type: "segment" as const,
    terms: [WORLDS_BY_SLUG[segment.world].name, segment.name].map((t) =>
      t.toLocaleLowerCase()
    ),
    data: segment,
  }));

export function useSearch(
  term: string,
  _sport: Sport
): {
  "strava-activity": SearchResultStravaActivity[];
  route: SearchResultRoute[];
  segment: SearchResultSegment[];
  world: SearchResultWorld[];
  place: SearchResultPlace[];
} {
  return useMemo(() => {
    if (REGEX_STRAVA_ACTIVITY.test(term)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [, stravaActivityId] = REGEX_STRAVA_ACTIVITY.exec(term)!;
      return {
        "strava-activity": [
          {
            type: "strava-activity",
            data: {
              activityId: +stravaActivityId,
              slug: `strava-activity-${stravaActivityId}`,
            },
          },
        ],
        route: [],
        segment: [],
        world: [],
        place: [],
      };
    }

    const terms = term
      .toLocaleLowerCase()
      .split(" ")
      .filter((t) => t.length > 0);

    return {
      world: searchResultsWorld.filter((world) =>
        terms.every((t) =>
          world.terms.some((worldTerm) => worldTerm.includes(t))
        )
      ),
      route: searchResultsRoute.filter((route) =>
        terms.every((t) =>
          route.terms.some((routeTerm) => routeTerm.includes(t))
        )
      ),
      segment: searchResultsSegment.filter((segment) =>
        terms.every((t) =>
          segment.terms.some((segmentTerm) => segmentTerm.includes(t))
        )
      ),
      place: [],
      "strava-activity": [],
    };
  }, [term]);
}

export const SEARCH_RESULTS_ORDER: SearchResult["type"][] = [
  "strava-activity",
  "world",
  "route",
  "segment",
  "place",
];

export const SEARCH_RESULTS_TYPES = {
  world: { title: "Worlds" },
  route: { title: "Routes" },
  segment: { title: "Segments" },
  place: { title: "Places" },
  "strava-activity": { title: "Strava Activity" },
} satisfies Record<SearchResult["type"], { title: string }>;
