import { LatLngTuple } from "leaflet";
import { DetailedActivity, StreamSet } from "strava";
import { Sport } from "zwift-data";

export interface StravaSegment {
  latlng: Array<[number, number]>;
  distance: number[];
  altitude: number[];
}

export interface Settings {
  sport: Sport;
  units: "imperial" | "metric";
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

export type HoverData = undefined | HoverDataRoute | HoverDataLatLng;

export interface HoverDataRoute {
  type: "route";
  route: string;
}

export interface HoverDataLatLng {
  type: "latlng";
  latlng: LatLngTuple[];
}
