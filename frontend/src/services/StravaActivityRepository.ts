import { DetailedSegmentEffort } from "strava";
import { World } from "zwift-data";
import { getWorld } from "../util/strava";
import {
  fetchActivity,
  fetchActivityStreams,
  updateActivity,
} from "./strava/api";

export async function getStravaActivity(
  activityId: number
): Promise<StravaActivity> {
  const activity = await fetchActivity(activityId);

  const world = getWorld(activity.start_latlng as [number, number]);

  if (!world) {
    throw new Error("Activity was not recorded in Zwift");
  }

  return {
    id: activity.id,
    name: activity.name,
    athleteId: activity.athlete.id.toString(),
    distance: activity.distance / 1_000,
    elevation: activity.total_elevation_gain,
    time: activity.moving_time,
    world: world,
    avgWatts: activity.average_watts,
    photoUrl: activity.photos.primary?.urls["100"],
    streams: await fetchStravaActivityStreams(activityId),
    kudos: activity.kudos_count,
    segmentEfforts: activity.segment_efforts,
  };
}

async function fetchStravaActivityStreams(
  activityId: number
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

export async function appendStravaDescription(
  activityId: number,
  text: string
) {
  const activity = await fetchActivity(activityId);

  const description =
    activity.description === "" || activity.description === null
      ? text
      : `${activity.description}\n\n${text}`;

  await updateActivity({ id: activityId, description });
}

export interface StravaActivity {
  id: number;
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
  segmentEfforts: DetailedSegmentEffort[];
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
