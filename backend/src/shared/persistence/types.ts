import { Boolean, Record, Static } from "runtypes";
import { DetailedActivity, StreamSet } from "../services/strava/index.js";

export const StravaAthleteSchema = Record({
  addLinkToActivityDescription: Boolean,
  persistActivities: Boolean,
});

export type StravaAthlete = Static<typeof StravaAthleteSchema>;

export interface StravaToken {
  athleteId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
  scope?: string[] | null;
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
  streams: Pick<StreamSet, "distance" | "altitude" | "latlng"> &
    Partial<Omit<StreamSet, "distance" | "altitude" | "latlng">>;
}
