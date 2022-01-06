import { DetailedActivity, StreamSet } from "strava";

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
  streams: Pick<StreamSet, "distance" | "altitude" | "latlng"> &
    Partial<Omit<StreamSet, "distance" | "altitude" | "latlng">>;
}
