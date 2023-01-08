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
  eventId: number;
  subgroupLabel: string | null;
}

export interface LocationStateShare {
  type: "share";
  world: World | null;
  shareId: string;
}

export interface LocationStateCustomRoute {
  type: "custom-route";
  world: World;
  points: (LatLngTuple | null)[];
}

export interface LocationStateFog {
  type: "fog";
  world: World;
}

export interface LocationStatePlaceNew {
  type: "place-new";
  world: World;
}

export interface LocationStatePlaceEdit {
  type: "place-edit";
  world: World;
  placeId: string;
}

export interface LocationStatePlace {
  type: "place";
  world: World;
  placeId: string;
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
  | LocationStateCustomRoute
  | LocationStateFog
  | LocationStatePlace
  | LocationStatePlaceEdit
  | LocationStatePlaceNew;
