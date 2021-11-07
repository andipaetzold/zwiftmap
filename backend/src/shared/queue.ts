import Queue from "bull";
import { REDIS_URL } from "./config";

interface UploadStravaMapData {
  athleteId: number;
  activityId: number;
}

export const uploadStravaMapQueue =
  new Queue<UploadStravaMapData>(
    "upload-strava-map",
    REDIS_URL
  );
