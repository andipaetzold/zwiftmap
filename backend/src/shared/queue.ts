import Queue from "bull";
import { REDIS_URL } from "./config";

interface UploadStravaActivityMapData {
  athleteId: number;
  activityId: number;
}

export const uploadStravaActivityMapQueue =
  new Queue<UploadStravaActivityMapData>(
    "upload-strava-activity-map",
    REDIS_URL
  );
