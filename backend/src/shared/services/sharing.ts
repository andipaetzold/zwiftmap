import { AxiosResponse } from "axios";
import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../config";
import { handleError } from "../error";
import { ErrorWithStatusCode } from "../ErrorWithStatusCode";
import { writeSharedItem } from "../persistence/sharedItem";
import { getWorld, isZwiftActivity } from "../util";
import { getToken, stravaUserAPI } from "./strava";

export async function shareActivity(
  athleteId: number,
  activityId: string
): Promise<string> {
  const accessToken = await getToken(athleteId);
  if (!accessToken) {
    throw new ErrorWithStatusCode("Missing Access Token", 403);
  }

  let activityResponse: AxiosResponse<DetailedActivity>;
  try {
    activityResponse = await stravaUserAPI.get<DetailedActivity>(
      `/activities/${activityId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  } catch (e) {
    handleError(e, "Error fetching activity");
    return "Error";
  }

  const activity = activityResponse.data;

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  let activityStreamsResponse: AxiosResponse<StreamSet>;
  try {
    activityStreamsResponse = await stravaUserAPI.get<StreamSet>(
      `/activities/${activityId}/streams`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          keys: [
            "distance",
            "latlng",
            "time",
            "altitude",
            "watts",
            "velocity_smooth",
            "watts",
            "cadence",
            "heartrate",
          ].join(","),
          key_by_type: true,
        },
      }
    );
  } catch (e) {
    handleError(e, "Error fetching activity");
    return "Error";
  }

  const activityStreams = activityStreamsResponse.data;

  const world = getWorld(activity)!;

  const sharedItemId = short.generate();

  await writeSharedItem({
    id: sharedItemId,
    type: "strava-activity",
    activity: activity,
    streams: activityStreams,
  });

  return `${FRONTEND_URL}/${world.slug}?shared=${sharedItemId}`;
}

export async function addLinkToActivity(
  athleteId: number,
  activityId: string
): Promise<void> {
  const accessToken = await getToken(athleteId);
  if (!accessToken) {
    throw new ErrorWithStatusCode("Missing Access Token", 403);
  }

  let activityResponse: AxiosResponse<DetailedActivity>;
  try {
    activityResponse = await stravaUserAPI.get<DetailedActivity>(
      `/activities/${activityId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  } catch (e) {
    handleError(e, "Error fetching activity");
    return;
  }

  const activity = activityResponse.data;

  if (!isZwiftActivity(activity)) {
    throw new ErrorWithStatusCode("Activity is no Zwift activity", 404);
  }

  let activityStreamsResponse: AxiosResponse<StreamSet>;
  try {
    activityStreamsResponse = await stravaUserAPI.get<StreamSet>(
      `/activities/${activityId}/streams`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          keys: [
            "distance",
            "latlng",
            "time",
            "altitude",
            "watts",
            "velocity_smooth",
            "watts",
            "cadence",
            "heartrate",
          ].join(","),
          key_by_type: true,
        },
      }
    );
  } catch (e) {
    handleError(e, "Error fetching activity");
    return;
  }

  const activityStreams = activityStreamsResponse.data;

  const world = getWorld(activity)!;

  const sharedItemId = short.generate();

  await writeSharedItem({
    id: sharedItemId,
    type: "strava-activity",
    activity: activity,
    streams: activityStreams,
  });

  const url = `${FRONTEND_URL}/${world.slug}?shared=${sharedItemId}`;
  const text = `View on ZwiftMap:\n${url}`;

  await stravaUserAPI.put(
    `/activities/${activityId}`,
    {
      ...activity,
      description:
        activity.description === ""
          ? text
          : `${activity.description}\n\n${text}`,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}
