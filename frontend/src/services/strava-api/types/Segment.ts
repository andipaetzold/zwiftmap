export interface Segment {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: number[];
  end_latlng: number[];
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
  map: Map;
  effort_count: number;
  athlete_count: number;
  star_count: number;
  athlete_segment_stats: AthleteSegmentStats;
  xoms: Xoms;
  local_legend: null;
}

interface AthleteSegmentStats {
  pr_elapsed_time: number | null;
  pr_date: string | null;
  pr_activity_id: number | null;
  effort_count: number;
}

interface Map {
  id: string;
  polyline: string;
  resource_state: number;
}

interface Xoms {
  kom: string;
  qom: string;
  destination: Destination;
}

interface Destination {
  href: string;
  type: string;
  name: string;
}
