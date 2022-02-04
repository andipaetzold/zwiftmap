import { LatLngTuple } from "leaflet";
import { Route, Segment, World } from "zwift-data";

export interface LocationStateDefault {
  type: "default";
  world: World;
}

export interface LocationStateRoute {
  type: "route";
  world: World;
  route: Route;
}

export interface LocationStateSegment {
  type: "segment";
  world: World;
  segment: Segment;
}

export interface LocationStateStravaActivity {
  type: "strava-activity";
  world: World | null;
  stravaActivityId: number;
}

export interface LocationStateStravaActivities {
  type: "strava-activities";
  world: World;
}

export interface LocationStateUpcomingEvents {
  type: "events";
  world: World;
}

export interface LocationStateUpcomingEvent {
  type: "event";
  world: World | null;
  eventId: string;
}

export interface LocationStateShare {
  type: "share";
  world: World | null;
  shareId: string;
}

export interface LocationStateRouting {
  type: "routing";
  world: World;
  points: LatLngTuple[]
}

export type LocationStateWithKey = LocationState & { key: string };
export type LocationState =
  | LocationStateDefault
  | LocationStateRoute
  | LocationStateSegment
  | LocationStateStravaActivity
  | LocationStateStravaActivities
  | LocationStateUpcomingEvents
  | LocationStateUpcomingEvent
  | LocationStateShare
  | LocationStateRouting;
