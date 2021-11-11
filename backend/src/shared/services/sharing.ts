import { DetailedActivity, StreamSet } from "strava";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import {
  getShareUrl,
  Share,
  writeShare,
} from "../persistence/share";
import { isZwiftActivity } from "../util";
import { getActivityById, getActivityStreams, updateActivity } from "./strava";

export async function shareActivity(
  athleteId: number,
  activityId: number
): Promise<Share> {
  const activity = await getActivityById(athleteId, activityId);
  const activityStreams = await getActivityStreams(athleteId, activityId);

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  return await createShare(activity, activityStreams);
}

export async function addLinkToActivity(
  athleteId: number,
  activityId: number
): Promise<Share> {
  const activity = await getActivityById(athleteId, activityId);
  const activityStreams = await getActivityStreams(athleteId, activityId);

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  const share = await createShare(activity, activityStreams);

  const url = getShareUrl(share.id);
  const text = `View on ZwiftMap:\n${url}`;
  const description =
    activity.description === "" ? text : `${activity.description}\n\n${text}`;

  await updateActivity(athleteId, {
    ...activity,
    description,
  });

  return share;
}

async function createShare(
  activity: DetailedActivity,
  activityStreams: StreamSet
): Promise<Share> {
  const share: Omit<Share, "id"> = {
    type: "strava-activity",
    activity: {
      id: activity.id,
      athleteId: activity.athlete.id,
      name: activity.name,
      distance: activity.distance / 1_000,
      elevation: activity.total_elevation_gain,
      time: activity.moving_time,
      avgWatts: activity.average_watts,
      photoUrl: activity.photos.primary?.urls["100"],
      streams: activityStreams,
      latlng: activity.start_latlng as [number, number],
    },
  };
  return await writeShare(share);
}
