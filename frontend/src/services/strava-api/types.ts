type ActivityStats = unknown;
type ActivityTotal = unknown;

type ActivityType = string;

type ActivityZone = unknown;

interface BaseStream {
  original_size: number;
  resolution: "low" | "medium" | "high";
  series_type: "distance" | "time";
}

export interface StreamSet {
  time: TimeStream;
  distance: DistanceStream;
  latlng: LatLngStream;
  altitude: AltitudeStream;
  velocity_smooth: SmoothVelocityStream;
  heartrate: HeartrateStream;
  cadence: CadenceStream;
  watts: PowerStream;
  temp: TemperatureStream;
  moving: MovingStream;
  grade_smooth: SmoothGradeStream;
}

interface SummaryGear {
  id: string;
  primary: boolean;
  name: string;
  resource_state: number;
  distance: number;
}

interface SummaryPRSegmentEffort {
  pr_elapsed_time: number | null;
  pr_date: string | null;
  pr_activity_id: number | null;
  effort_count: number;
}

interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: MetaActivity;
  athlete: MetaAthlete;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  total_elevation_gain?: number;
  average_speed?: number;
  max_speed?: number;
  average_cadence: number;
  device_watts: boolean;
  average_watts: number;
  lap_index?: number;
  split?: number;
  kom_rank?: null;
  pr_rank?: null;
  achievements?: any[];
  hidden?: boolean;
}

type LatLng = [number, number];

interface MetaActivity {
  id: number;
}

interface MetaAthlete {
  id: number;
}

interface MetaClub {
  id: number;
  resource_state: 1 | 2 | 3;
  name: string;
}

interface PhotosSummary {
  count: number;
  primary?: PhotosSummary_primary;
}

interface PhotosSummary_primary {
  id: number;
  source: number;
  unique_id: string;
  urls: Record<string, string>;
}

interface PolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

interface AltitudeStream extends BaseStream {
  data: number[];
}

interface CadenceStream extends BaseStream {
  data: number[];
}

type DetailedGear = unknown;
export type DetailedSegment = {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: LatLng;
  end_latlng: LatLng;
  elevation_profile: string;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  climb_category: number;
  city: null;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
  created_at: string;
  updated_at: string;
  total_elevation_gain: number;
  map: PolylineMap;
  effort_count: number;
  athlete_count: number;
  star_count: number;
  athlete_segment_stats: SummaryPRSegmentEffort;
  local_legend: null;
};
type DetailedSegmentEffort = unknown;

interface DistanceStream extends BaseStream {
  data: number[];
}

interface HeartrateStream extends BaseStream {
  data: number[];
}

interface LatLngStream extends BaseStream {
  data: LatLng[];
}

interface MovingStream extends BaseStream {
  data: boolean[];
}

interface PowerStream extends BaseStream {
  data: number[];
}

interface SmoothGradeStream extends BaseStream {
  data: number[];
}

interface SmoothVelocityStream extends BaseStream {
  data: number[];
}

type SummaryActivity = unknown;
type SummaryAthlete = unknown;
type SummaryClub = unknown;

interface TemperatureStream extends BaseStream {
  data: number[];
}

interface TimeStream extends BaseStream {
  data: number[];
}

type TimedZoneRange = unknown;

export interface DetailedActivity {
  id: number;
  resource_state: number;
  external_id: string;
  upload_id: number;
  athlete: MetaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: ActivityType;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: number[];
  end_latlng: number[];
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_temp: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  max_watts: number;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  workout_type: number;
  suffer_score: null;
  description: string;
  calories: number;
  segment_efforts: DetailedSegmentEffort[];
  splits_metric: {
    distance: number;
    elapsed_time: number;
    elevation_difference: number;
    moving_time: number;
    split: number;
    average_speed: number;
    pace_zone: number;
  }[];
  laps: Lap[];
  gear: SummaryGear;
  partner_brand_tag: null;
  photos: PhotosSummary;
  device_name: string;
  embed_token: string;
  segment_leaderboard_opt_out: boolean;
  leaderboard_opt_out: boolean;
  best_efforts: DetailedSegmentEffort[];
}

type DetailedAthlete = unknown;

type DetailedClub = unknown;
