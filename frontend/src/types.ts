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
