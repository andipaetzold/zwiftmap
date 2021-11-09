import { World } from "zwift-data";
import { getWorld } from "../util/strava";
import { fetchActivity, fetchActivityStreams } from "./strava/api";

export async function getStravaActivity(
  activityId: string
): Promise<StravaActivity> {
  const esa = await fetchActivity(activityId);

  const world = getWorld(esa);

  if (!world) {
    throw new Error("Activity was not recorded in Zwift");
  }

  return {
    id: esa.id.toString(),
    name: esa.name,
    athleteId: esa.athlete.id.toString(),
    distance: esa.distance / 1_000,
    elevation: esa.total_elevation_gain,
    time: esa.moving_time,
    world: world,
    avgWatts: esa.average_watts,
    photoUrl: esa.photos.primary?.urls["100"],
    streams: await fetchStravaActivityStreams(activityId),
    kudos: esa.kudos_count,
  };
}

async function fetchStravaActivityStreams(
  activityId: string
): Promise<StravaActivityStreams> {
  const streams = await fetchActivityStreams(activityId);

  return {
    altitude: streams.altitude.data,
    cadence: streams.cadence?.data,
    distance: streams.distance.data,
    heartrate: streams.heartrate?.data,
    latlng: streams.latlng.data as unknown as [number, number][],
    time: streams.time.data,
    velocity: streams.velocity_smooth.data,
    watts: streams.watts?.data,
  };
}

export interface StravaActivity {
  id: string;
  athleteId: string;
  name: string;
  distance: number;
  time: number;
  elevation: number;
  world: World;
  avgWatts?: number;
  photoUrl?: string;
  streams: StravaActivityStreams;
  kudos: number;
}

export interface StravaActivityStreams {
  altitude: number[];
  cadence?: number[];
  distance: number[];
  heartrate?: number[];
  latlng: [number, number][];
  time: number[];
  velocity: number[];
  watts?: number[];
}
