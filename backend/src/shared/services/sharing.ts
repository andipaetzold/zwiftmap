import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { handleError } from "../error";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import { getSharedItemUrl, writeSharedItem } from "../persistence/sharedItem";
import { isZwiftActivity } from "../util";
import { getActivityById, getActivityStreams, updateActivity } from "./strava";

export async function shareActivity(
  athleteId: number,
  activityId: number
): Promise<string> {
  let activity: DetailedActivity;
  try {
    activity = await getActivityById(athleteId, activityId);
  } catch (e) {
    handleError(e, "Error fetching activity");
    return "Error";
  }

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  let activityStreams: StreamSet;
  try {
    activityStreams = await getActivityStreams(athleteId, activityId);
  } catch (e) {
    handleError(e, "Error fetching activity");
    return "Error";
  }

  const sharedItemId = short.generate();
  await createSharedItem(sharedItemId, activity, activityStreams);
  return getSharedItemUrl(sharedItemId);
}

export async function addLinkToActivity(
  athleteId: number,
  activityId: number
): Promise<void> {
  let activity: DetailedActivity;
  let activityStreams: StreamSet;
  try {
    activity = await getActivityById(athleteId, activityId);
    activityStreams = await getActivityStreams(athleteId, activityId);
  } catch (e) {
    handleError(e, "Error fetching activity");
    return;
  }

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  const sharedItemId = short.generate();
  await createSharedItem(sharedItemId, activity, activityStreams);

  const url = getSharedItemUrl(sharedItemId);
  const text = `View on ZwiftMap:\n${url}`;
  const description =
    activity.description === "" ? text : `${activity.description}\n\n${text}`;

  await updateActivity(athleteId, {
    ...activity,
    description,
  });
}

async function createSharedItem(
  id: string,
  activity: DetailedActivity,
  activityStreams: StreamSet
): Promise<void> {
  await writeSharedItem({
    id,
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
    },
  });
}
