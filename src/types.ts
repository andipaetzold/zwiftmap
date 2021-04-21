export interface World {
  id: number;
  name: string;
  slug: WorldSlug;
}

export interface Route {
  world: WorldSlug;
  name: string;
  slug: string;
  distance: number;
  elevation: number;
  leadInDistance?: number;
  leadInElevation?: number;
  experience?: number;
  segments: string[];
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  zwiftInsiderUrl?: string;
  whatsOnZwiftUrl?: string;
  sports: Sport[];
  eventOnly: boolean;
  id: number;
}

export type Sport = "running" | "cycling";
export type WorldSlug =
  | "bologna"
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
  distance?: number;
  elevation?: number;
  avgIncline?: number;
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  type: "sprint" | "climb" | "segment";
  whatsOnZwiftUrl?: string;
  climbType?: "HC" | "4" | "3" | "2" | "1";
}

export interface Settings {
  sport: Sport;
}

export interface LocationState {
  world: World;
  route?: Route;
}
