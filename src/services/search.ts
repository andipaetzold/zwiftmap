import { routes, worlds } from "../data";
import { Route, Segment, Sport, World } from "../types";

export type SearchResult =
  | SearchResultWorld
  | SearchResultRoute
  | SearchResultSegment;

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

const searchResults: SearchResult[] = [
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
      terms: [
        worlds.find((w) => w.slug === route.world)!.name,
        route.name,
      ].map((t) => t.toLocaleLowerCase()),
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
  const terms = term
    .toLocaleLowerCase()
    .split(" ")
    .filter((t) => t.length > 0);

  return searchResults
    .filter((sr) => {
      if (sr.type === "world") {
        return true;
      } else {
        return sr.data.sport === sport;
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
};
