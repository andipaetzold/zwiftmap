import { ActivityZoneType } from "./ActivityZoneType.js";
import { TimedZoneRange } from "./TimeZoneRange.js";

export interface ActivityZone {
  score: number;
  distribution_buckets: TimedZoneRange[];
  type: ActivityZoneType;
  sensor_based: boolean;
  points: number;
  custom_zones: boolean;
  max: number;
}
