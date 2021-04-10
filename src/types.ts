export interface Route {
  world: WorldSlug;
  name: string;
  slug: string;
  distance: number;
  elevation: number;
  leadInDistance: number;
  leadInElevation: number;
  experience: number[];
  kom: string[];
  sprint: string[];
  lap: string[];
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  zwiftInsiderUrl: string;
  sport: Sport;
}

export type Sport = "running" | "cycling";
export type WorldSlug =
  | "crit-city"
  | "france"
  | "innsbruck"
  | "london"
  | "paris"
  | "new-york"
  | "richmond"
  | "watopia"
  | "yorkshire";

export interface StravaSegment {
  latlng: Array<[number, number]>;
  distance: number[];
  altitude: number[];
}

export interface Segment {
  world: WorldSlug;
  name: string;
  slug: string;
  distance: number;
  elevation: number;
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  sport: Sport;
}

export interface World {
  name: string;
  slug: WorldSlug;
}


export interface RouteSelection {
  world: WorldSlug;
  route?: Route;
}