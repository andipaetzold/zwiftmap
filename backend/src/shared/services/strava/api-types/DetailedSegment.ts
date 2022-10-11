import { LatLng } from "../../../types.js";
import { ActivityType } from "./ActivityType.js";
import { DetailedPolylineMap } from "./PolylineMap.js";
import { SummaryPRSegmentEffort } from "./SummaryPRSegmentEffort.js";
import { SummarySegmentEffort } from "./SummarySegmentEffort.js";

export interface DetailedSegment {
  id: number;
  name: string;
  activity_type: ActivityType;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: LatLng;
  end_latlng: LatLng;
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  athlete_pr_effort: SummarySegmentEffort;
  athlete_segment_stats: SummaryPRSegmentEffort;
  created_at: string;
  updated_at: string;
  total_elevation_gain: number;
  map: DetailedPolylineMap;
  effort_count: number;
  athlete_count: number;
  hazardous: boolean;
  star_count: number;
}
