import { pick } from "lodash-es";
import { config } from "../config.js";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode.js";
import { createShareImage } from "../image/share.js";
import {
  getShareUrl,
  Share,
  ShareStravaActivity,
  writeShare,
} from "../persistence/index.js";
import { createToGoogleCloudStorageFileWriteStream } from "../services/gcs.js";
import { Logger } from "../types.js";
import { isZwiftActivity } from "../util.js";
import {
  CachedStravaUserAPI,
  DetailedActivity,
  StreamSet,
} from "./strava/index.js";
import { finished } from "node:stream/promises";

export async function shareActivity(
  athleteId: number,
  activityId: number,
  logger: Logger
): Promise<Share> {
  const api = new CachedStravaUserAPI(athleteId);

  const [{ result: activity }, { result: activityStreams }] = await Promise.all(
    [api.getActivityById(activityId), api.getActivityStreams(activityId)]
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
  const api = new CachedStravaUserAPI(athleteId);
  const [{ result: activity }, { result: activityStreams }] = await Promise.all(
    [api.getActivityById(activityId), api.getActivityStreams(activityId)]
  );

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  if ((activity.description ?? "").includes(config.frontendUrl)) {
    return;
  }

  const share = await createShare(activity, activityStreams, logger);

  const url = getShareUrl(share.id);
  const text = `View on ZwiftMap:\n${url}`;
  const description =
    (activity.description ?? "") === ""
      ? text
      : `${activity.description}\n\n${text}`;

  await api.updateActivity(activityId, { description });
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

  const tasks = [
    {
      type: "share",
      shareId: share.id,
      resolution: { width: 1088, height: 436 },
      gcsFilename: `strava-activities/${activity.id}/feed-wide.png`,
    },
    {
      type: "share",
      shareId: share.id,
      resolution: { width: 540, height: 540 },
      gcsFilename: `strava-activities/${activity.id}/feed-square.png`,
    },
    {
      type: "share",
      shareId: share.id,
      resolution: { width: 1088, height: 362 },
      gcsFilename: `strava-activities/${activity.id}/feed-group.png`,
    },
  ];

  for (const task of tasks) {
    const imageStream = await createShareImage(share, task.resolution);

    const uploadStream = imageStream.pipe(
      createToGoogleCloudStorageFileWriteStream(
        "images.zwiftmap.com",
        task.gcsFilename
      )
    );

    await finished(uploadStream);
  }

  return share;
}
