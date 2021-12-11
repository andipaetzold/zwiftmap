import { LatLngTuple } from "leaflet";
import { DetailedActivity, StreamSet } from "strava";
import { Sport } from "zwift-data";
import { ZwiftEventType } from "./services/events";

export interface StravaSegment {
  latlng: Array<[number, number]>;
  distance: number[];
  altitude: number[];
}

export interface Settings {
  sport: Sport;
  units: Units;
}

export type Units = "imperial" | "metric";

export interface SessionSettings {
  sortState: SortState;
  eventFilter: EventFilterState;
}

export type SortKey =
  | "name"
  | "distance"
  | "elevation"
  | "experience"
  | "leadInDistance"
  | "leadInElevation";
export type SortDir = "ASC" | "DESC";

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

export interface EventFilterState {
  eventTypes: ZwiftEventType[];
}

export type Share = ShareStravaActivity;

export interface ShareStravaActivity {
  id: string;
  type: "strava-activity";
  activity: Pick<
    DetailedActivity,
    | "id"
    | "name"
    | "distance"
    | "moving_time"
    | "total_elevation_gain"
    | "average_watts"
    | "start_latlng"
    | "start_date"
  >;
  athlete: { id: number };
  streams: StreamSet;
}

export interface StravaSettings {
  addLinkToActivityDescription: boolean;
}

export type HoverData =
  | undefined
  | HoverDataRoute
  | HoverDataSegment
  | HoverDataLatLng;

export interface HoverDataRoute {
  type: "route";
  route: string;
}

export interface HoverDataSegment {
  type: "segment";
  segment: string;
}

export interface HoverDataLatLng {
  type: "latlng";
  latlng: LatLngTuple[];
}

export interface AuthStatus {
  strava: boolean;
}
