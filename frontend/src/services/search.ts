import { Route, routes, Segment, Sport, World, worlds } from "zwift-data";

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
    activityId: string;
  };
}

const searchResults: (
  | SearchResultWorld
  | SearchResultRoute
  | SearchResultSegment
)[] = [
  ...[...worlds]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((world) => ({
      type: "world" as const,
      terms: [world.name].map((t) => t.toLocaleLowerCase()),
      data: world,
    })),
  ...[...routes]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((route) => route.stravaSegmentId !== undefined)
    .map((route) => ({
      type: "route" as const,
      terms: [worlds.find((w) => w.slug === route.world)!.name, route.name].map(
        (t) => t.toLocaleLowerCase()
      ),
      data: route,
    })),
  //   ...segments
  //     .filter((route) => route.stravaSegmentId !== undefined)
  //     .map((segment) => ({
  //     type: "segment" as const,
  //     terms: [
  //       worlds.find((w) => w.slug === segment.slug)!.name,
  //       segment.name,
  //     ].map((t) => t.toLocaleLowerCase()),
  //     data: segment,
  //   })),
];

export function search(term: string, sport: Sport): SearchResult[] {
  if (REGEX_STRAVA_ACTIVITY.test(term)) {
    const [, stravaActivityId] = REGEX_STRAVA_ACTIVITY.exec(term)!;
    return [
      {
        type: "strava-activity",
        data: {
          activityId: stravaActivityId,
          slug: `strava-activity-${stravaActivityId}`,
        },
      },
    ];
  }

  const terms = term
    .toLocaleLowerCase()
    .split(" ")
    .filter((t) => t.length > 0);

  return searchResults
    .filter((sr) => {
      if (sr.type === "world" || sr.type === "segment") {
        return true;
      } else {
        return sr.data.sports.includes(sport);
      }
    })

    .filter((sr) =>
      terms.every((t) => sr.terms.some((srt) => srt.includes(t)))
    );
}

export const searchResultTypes = {
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
