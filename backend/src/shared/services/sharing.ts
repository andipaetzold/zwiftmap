import pick from "lodash/pick";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import { getShareUrl, writeShare } from "../persistence/share";
import { Share, ShareStravaActivity } from "../persistence/types";
import { imageQueue } from "../queue";
import { ImageQueueData, Logger } from "../types";
import { isZwiftActivity } from "../util";
import { getActivityById, getActivityStreams, updateActivity } from "./strava";
import { enqueueImageTask } from "./tasks";

export async function shareActivity(
  athleteId: number,
  activityId: number,
  logger: Logger
): Promise<Share> {
  const { result: activity } = await getActivityById(athleteId, activityId);
  const { result: activityStreams } = await getActivityStreams(
    athleteId,
    activityId
  );

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  return await createShare(activity, activityStreams, logger);
}

export async function addLinkToActivity(
  athleteId: number,
  activityId: number,
  logger: Logger
): Promise<void> {
  const { result: activity } = await getActivityById(athleteId, activityId);
  const { result: activityStreams } = await getActivityStreams(
    athleteId,
    activityId
  );

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  if ((activity.description ?? "").includes(FRONTEND_URL)) {
    return;
  }

  const share = await createShare(activity, activityStreams, logger);

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
  activityStreams: Partial<StreamSet>,
  logger: Logger
) {
  if (
    !activityStreams.altitude ||
    !activityStreams.distance ||
    !activityStreams.latlng
  ) {
    throw new ErrorWithStatusCode(
      "Altitude, Distance, and LatLng streams must exist",
      404
    );
  }

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
    streams: activityStreams as ShareStravaActivity["streams"],
  };

  const share = await writeShare(shareWithoutId);

  const jobs = [
    {
      data: {
        type: "share",
        shareId: share.id,
        resolution: { width: 1088, height: 436 },
        googleCloudStorage: {
          filename: `strava-activities/${activity.id}/feed-wide.png`,
        },
      },
    },
    {
      data: {
        type: "share",
        shareId: share.id,
        resolution: { width: 540, height: 540 },
        googleCloudStorage: {
          filename: `strava-activities/${activity.id}/feed-square.png`,
        },
      },
    },
    {
      data: {
        type: "share",
        shareId: share.id,
        resolution: { width: 1088, height: 362 },
        googleCloudStorage: {
          filename: `strava-activities/${activity.id}/feed-group.png`,
        },
      },
    },
  ] as { data: ImageQueueData }[];
  await imageQueue.addBulk(jobs);

  for (const job of jobs) {
    await enqueueImageTask(job.data, logger);
  }

  return share;
}
