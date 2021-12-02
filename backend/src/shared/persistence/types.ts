import { Boolean, Record, Static } from "runtypes";
import { DetailedActivity, StreamSet } from "strava";

export const StravaSettings = Record({
  addLinkToActivityDescription: Boolean,
});

export type StravaSettingsType = Static<typeof StravaSettings>;
export type StravaSettingsDBRow = { athleteId: number } & StravaSettingsType;

export interface StravaToken {
  athleteId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
  scope?: string[] | null;
}

export interface ShareDBRow {
  id: string;
  type: "strava-activity";
}

export type Share = ShareStravaActivity;

export interface ShareStravaActivity {
  id: string;
  type: "strava-activity";
  athlete: { id: number };
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
  streams: StreamSet;
}

export interface ShareStravaActivityDBRow {
  id: string;
  athlete: { id: number };
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
  streams: StreamSet;
}
