import { Route, Segment, World } from "zwift-data";

interface LocationStateBase {
  query: string;
}

export interface LocationStateDefault extends LocationStateBase {
  type: "default";
  world: World;
}

export interface LocationStateRoute extends LocationStateBase {
  type: "route";
  world: World;
  route: Route;
  segments: Segment[];
}

export interface LocationStateStravaActivity extends LocationStateBase {
  type: "strava-activity";
  world: World | null;
  stravaActivityId: string;
}

export interface LocationStateStravaActivities extends LocationStateBase {
  type: "strava-activities";
  world: World;
}

export interface LocationStateUpcomingEvents extends LocationStateBase {
  type: "events";
  world: World;
}

export interface LocationStateUpcomingEvent extends LocationStateBase {
  type: "event";
  world: World | null;
  eventId: string;
}

export type LocationStateWithKey = LocationState & { key: string };
export type LocationState =
  | LocationStateDefault
  | LocationStateRoute
  | LocationStateStravaActivity
  | LocationStateStravaActivities
  | LocationStateUpcomingEvents
  | LocationStateUpcomingEvent;
