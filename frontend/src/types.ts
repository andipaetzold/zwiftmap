import { StreamSet } from "strava";
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
  activity: {
    id: number;
    athleteId: number;
    name: string;
    distance: number;
    time: number;
    elevation: number;
    avgWatts?: number;
    photoUrl?: string;
    streams: StreamSet;
    latlng: [number, number]
  };
}
