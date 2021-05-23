import { worlds } from "../data";
import { World } from "../types";
import { worldConfigs } from "../worldConfig";
import { fetchActivity, fetchActivityStreams } from "./strava-api";

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
  const esa = await fetchActivity(activityId, token);

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

  return {
    id: esa.id.toString(),
    name: esa.name,
    athleteId: esa.athlete.id.toString(),
    distance: esa.distance,
    elevation: esa.total_elevation_gain,
    time: esa.moving_time,
    world: world,
    avgWatts: esa.average_watts,
    photoUrl: esa.photos.primary?.urls["100"],
    streams: await fetchStravaActivityStreams(token, activityId),
  };
}

async function fetchStravaActivityStreams(
  token: string,
  activityId: string
): Promise<StravaActivityStreams> {
  const streams = await fetchActivityStreams(activityId, token);

  return {
    altitude: streams.altitude.data,
    cadence: streams.cadence.data,
    distance: streams.distance.data,
    heartrate: streams.heartrate.data,
    latlng: streams.latlng.data,
    time: streams.time.data,
    velocity: streams.velocity_smooth.data,
    watts: streams.watts.data,
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
}

export interface StravaActivityStreams {
  altitude: number[];
  cadence: number[];
  distance: number[];
  heartrate: number[];
  latlng: [number, number][];
  time: number[];
  velocity: number[];
  watts: number[];
}
