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

const REGEX_STRAVA_ACTIVITY = /strava\.com\/activities\/(\d{10})/;

export type SearchResult =
  | SearchResultWorld
  | SearchResultRoute
  | SearchResultSegment
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
const searchResultsRoute = [...routes]
  .filter((route) => route.stravaSegmentId !== undefined)
  .map((route) => ({
    type: "route" as const,
    terms: [WORLDS_BY_SLUG[route.world].name, route.name].map((t) =>
      t.toLocaleLowerCase()
    ),
    data: route,
  }));
const searchResultsSegment = [...segments]
  .filter((segment) => segment.stravaSegmentId !== undefined)
  .map((segment) => ({
    type: "segment" as const,
    terms: [WORLDS_BY_SLUG[segment.world].name, segment.name].map((t) =>
      t.toLocaleLowerCase()
    ),
    data: segment,
  }));

export function search(
  term: string,
  _sport: Sport
): { [type in SearchResult["type"]]: SearchResult[] } {
  if (REGEX_STRAVA_ACTIVITY.test(term)) {
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
    };
  }

  const terms = term
    .toLocaleLowerCase()
    .split(" ")
    .filter((t) => t.length > 0);

  return {
    world: searchResultsWorld.filter((world) =>
      terms.every((t) => world.terms.some((worldTerm) => worldTerm.includes(t)))
    ),
    route: searchResultsRoute.filter((route) =>
      terms.every((t) => route.terms.some((routeTerm) => routeTerm.includes(t)))
    ),
    segment: searchResultsSegment.filter((segment) =>
      terms.every((t) =>
        segment.terms.some((segmentTerm) => segmentTerm.includes(t))
      )
    ),
    "strava-activity": [],
  };
}

export const SEARCH_RESULTS_ORDER: SearchResult["type"][] = [
  "strava-activity",
  "world",
  "route",
  "segment",
];

export const SEARCH_RESULTS_TYPES = {
  world: {
    title: "Worlds",
  },
  route: {
    title: "Routes",
  },
  segment: {
    title: "Segments",
  },
  "strava-activity": {
    title: "Strava Activity",
  },
};
