import pick from "lodash/pick";
import { DetailedActivity, StreamSet } from "strava";
import { ENVIRONMENT, FRONTEND_URL } from "../config";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import { getShareUrl, Share, writeShare } from "../persistence/share";
import { isZwiftActivity } from "../util";
import { getActivityById, getActivityStreams, updateActivity } from "./strava";
import { cloudinary } from "./cloudinary";

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
): Promise<void> {
  const activity = await getActivityById(athleteId, activityId);
  const activityStreams = await getActivityStreams(athleteId, activityId);

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  if ((activity.description ?? "").includes(FRONTEND_URL)) {
    return;
  }

  const share = await createShare(activity, activityStreams);

  const url = getShareUrl(share.id);
  const text = `View on ZwiftMap:\n${url}`;
  const description =
    (activity.description ?? "") === ""
      ? text
      : `${activity.description}\n\n${text}`;

  await updateActivity(athleteId, activityId, { description });
}

async function createShare(
  activity: DetailedActivity,
  activityStreams: StreamSet
): Promise<Share> {
  const shareWithoutId: Omit<Share, "id"> = {
    type: "strava-activity",
    activity: pick(activity, [
      "id",
      "name",
      "distance",
      "total_elevation_gain",
      "moving_time",
      "average_watts",
      "start_latlng",
      "start_date",
    ]),
    athlete: pick(activity.athlete, "id"),
    streams: activityStreams,
  };

  const share = await writeShare(shareWithoutId);

  if (ENVIRONMENT === "development") {
    const upload = await cloudinary.uploader.upload(
      "https://via.placeholder.com/350x150",
      {
        folder: "shared",
        public_id: share.id,
        overwrite: true,
      }
    );
    await cloudinary.uploader.add_tag(`env:${ENVIRONMENT}`, [upload.public_id]);
  }

  return share;
}
