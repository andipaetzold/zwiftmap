import { DetailedActivity, StreamSet } from "strava";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import {
  getSharedItemUrl,
  SharedItem,
  writeSharedItem,
} from "../persistence/sharedItem";
import { isZwiftActivity } from "../util";
import { getActivityById, getActivityStreams, updateActivity } from "./strava";

export async function shareActivity(
  athleteId: number,
  activityId: number
): Promise<SharedItem> {
  const activity = await getActivityById(athleteId, activityId);
  const activityStreams = await getActivityStreams(athleteId, activityId);

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  return await createSharedItem(activity, activityStreams);
}

export async function addLinkToActivity(
  athleteId: number,
  activityId: number
): Promise<SharedItem> {
  const activity = await getActivityById(athleteId, activityId);
  const activityStreams = await getActivityStreams(athleteId, activityId);

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  const sharedItem = await createSharedItem(activity, activityStreams);

  const url = getSharedItemUrl(sharedItem.id);
  const text = `View on ZwiftMap:\n${url}`;
  const description =
    activity.description === "" ? text : `${activity.description}\n\n${text}`;

  await updateActivity(athleteId, {
    ...activity,
    description,
  });

  return sharedItem;
}

async function createSharedItem(
  activity: DetailedActivity,
  activityStreams: StreamSet
): Promise<SharedItem> {
  const sharedItem: Omit<SharedItem, "id"> = {
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
  return await writeSharedItem(sharedItem);
}
