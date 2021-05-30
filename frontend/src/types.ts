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
  | "makuri-islands"
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
  elevation?: number;
  avgIncline?: number;
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  type: SegmentType;
  whatsOnZwiftUrl?: string;
  climbType?: "HC" | "4" | "3" | "2" | "1";
}
export type SegmentType = "sprint" | "climb" | "segment";

export interface Settings {
  sport: Sport;
  units: "imperial" | "metric";
}

interface LocationStateBase {
  world: World;
  query: string;
}

export interface LocationStateDefault extends LocationStateBase {
  type: "default";
}

export interface LocationStateRoute extends LocationStateBase {
  type: "route";
  route: Route;
  segments: Segment[];
}

export interface LocationStateStravaActivity extends LocationStateBase {
  type: "strava-activity";
  stravaActivityId: string;
}

export interface LocationStateStravaActivities extends LocationStateBase {
  type: "strava-activities";
}

export type LocationState =
  | LocationStateDefault
  | LocationStateRoute
  | LocationStateStravaActivity
  | LocationStateStravaActivities;
