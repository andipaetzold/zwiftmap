import { worlds } from "../data";
import { WorldSlug } from "../types";
import { worldConfigs } from "../worldConfig";

const activityCache: { [activityId: string]: Promise<StravaActivity> } = {};

export async function getStravaActivity(
  token: string,
  activityId: string
): Promise<StravaActivity> {
  if (!activityCache[activityId]) {
    activityCache[activityId] = fetchStravaActivity(token, activityId);
  }

  return activityCache[activityId];
}

async function fetchStravaActivity(
  token: string,
  activityId: string
): Promise<StravaActivity> {
  const response = await fetch(
    `https://www.strava.com/api/v3/activities/${activityId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const esa: ExternalStravaActivity = await response.json();

  const world = worlds.find((world) => {
    const worldConfig = worldConfigs[world.slug];
    const bb = worldConfig.imageBounds;
    return (
      bb[0][0] >= esa.start_latlng[0] &&
      esa.start_latlng[0] >= bb[1][0] &&
      bb[0][1] <= esa.start_latlng[1] &&
      esa.start_latlng[1] <= bb[1][1]
    );
  });

  if (!world) {
    throw new Error("Activity was not recorded in Zwift");
  }

  console.log(world);

  return {
    id: esa.id,
    name: esa.name,
    athleteId: esa.athlete.id,
    distance: esa.distance,
    elevation: esa.total_elevation_gain,
    time: esa.moving_time,
    world: world.slug,
    avgWatts: esa.average_watts,
    photoUrl: esa.photos.primary?.urls["100"],
  };
}

export interface StravaActivity {
  id: number;
  athleteId: number;
  name: string;
  distance: number;
  time: number;
  elevation: number;
  world: WorldSlug;
  avgWatts?: number;
  photoUrl?: string;
}

interface ExternalStravaActivity {
  id: number;
  resource_state: number;
  external_id: string;
  upload_id: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
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
  map: Map;
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
  segment_efforts: Lap[];
  splits_metric: SplitsMetric[];
  laps: Lap[];
  gear: Gear;
  partner_brand_tag: null;
  photos: Photos;
  highlighted_kudosers: HighlightedKudoser[];
  device_name: string;
  embed_token: string;
  segment_leaderboard_opt_out: boolean;
  leaderboard_opt_out: boolean;
}

interface Athlete {
  id: number;
  resource_state: number;
}

interface Gear {
  id: string;
  primary: boolean;
  name: string;
  resource_state: number;
  distance: number;
}

interface HighlightedKudoser {
  destination_url: string;
  display_name: string;
  avatar_url: string;
  show_name: boolean;
}

interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: Athlete;
  athlete: Athlete;
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
  segment?: Segment;
  kom_rank?: null;
  pr_rank?: null;
  achievements?: any[];
  hidden?: boolean;
}

interface Segment {
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
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
}

interface Map {
  id: string;
  polyline: string;
  resource_state: number;
  summary_polyline: string;
}

interface Photos {
  primary?: Primary;
  use_primary_photo: boolean;
  count: number;
}

interface Primary {
  id: null;
  unique_id: string;
  urls: { [key: string]: string };
  source: number;
}

interface SplitsMetric {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  pace_zone: number;
}
