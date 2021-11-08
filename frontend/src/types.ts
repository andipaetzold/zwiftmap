import { Route, Segment, Sport, World } from "zwift-data";

export interface StravaSegment {
  latlng: Array<[number, number]>;
  distance: number[];
  altitude: number[];
}

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

export interface LocationStateUpcomingEvents extends LocationStateBase {
  type: "upcoming-events";
}

export type LocationState =
  | LocationStateDefault
  | LocationStateRoute
  | LocationStateStravaActivity
  | LocationStateStravaActivities
  | LocationStateUpcomingEvents;
