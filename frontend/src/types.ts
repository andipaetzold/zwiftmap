import { LatLngTuple } from "leaflet";
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

export interface AuthStatus {
  strava: boolean;
}
