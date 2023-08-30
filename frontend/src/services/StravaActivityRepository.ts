import { DetailedSegment, DetailedSegmentEffort } from "strava";
import { World } from "zwift-data";
import { getWorld } from "../util/strava";
import {
  getStravaActivityById,
  getStravaActivityStreams,
  updateStravaActivity,
} from "./zwiftMapApi";

export async function getStravaActivity(
  activityId: number,
): Promise<StravaActivity> {
  const activity = await getStravaActivityById(activityId);

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
    segmentEfforts: activity.segment_efforts as (DetailedSegmentEffort & {
      segment: DetailedSegment;
    })[],
  };
}

async function fetchStravaActivityStreams(
  activityId: number,
): Promise<StravaActivityStreams> {
  const streams = await getStravaActivityStreams(activityId);

  return {
    altitude: streams.altitude?.data,
    cadence: streams.cadence?.data,
    distance: streams.distance?.data,
    heartrate: streams.heartrate?.data,
    latlng: streams.latlng?.data,
    time: streams.time?.data,
    velocity: streams.velocity_smooth?.data,
    watts: streams.watts?.data,
  };
}

export async function appendStravaDescription(
  activityId: number,
  text: string,
) {
  const activity = await getStravaActivityById(activityId);

  const description =
    (activity.description ?? "") === ""
      ? text
      : `${activity.description}\n\n${text}`;

  await updateStravaActivity(activityId, { description });
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
  segmentEfforts: (DetailedSegmentEffort & { segment: DetailedSegment })[];
}

export interface StravaActivityStreams {
  altitude?: number[];
  cadence?: number[];
  distance?: number[];
  heartrate?: number[];
  latlng?: [number, number][];
  time?: number[];
  velocity?: number[];
  watts?: number[];
}
