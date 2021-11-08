import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import short from "short-uuid";
import { DetailedActivity, StreamSet } from "strava";
import { FRONTEND_URL } from "../../../shared/config";
import { writeSharedItem } from "../../../shared/persistence/sharedItem";
import { getToken, stravaUserAPI } from "../../../shared/services/strava";
import { getWorld, isZwiftActivity } from "../../../shared/util";
import { Session } from "../../types";

const Body = Record({
  activityId: String,
});

export async function handleShareActivity(req: Request, res: Response) {
  const session: Session = req.session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const accessToken = await getToken(session.stravaAthleteId);
  if (!accessToken) {
    res.sendStatus(403);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const body = req.body;

  let activityResponse: AxiosResponse<DetailedActivity>;
  try {
    activityResponse = await stravaUserAPI.get<DetailedActivity>(
      `/activities/${body.activityId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      res.sendStatus(e.response?.status ?? 500);
    } else {
      res.sendStatus(500);
    }
    return;
  }
  const activity = activityResponse.data;

  if (!isZwiftActivity(activity)) {
    res.sendStatus(404);
    return;
  }

  let activityStreamsResponse: AxiosResponse<StreamSet>;
  try {
    activityStreamsResponse = await stravaUserAPI.get<StreamSet>(
      `/activities/${body.activityId}/streams`,
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
    if (axios.isAxiosError(e)) {
      res.sendStatus(e.response?.status ?? 500);
    } else {
      res.sendStatus(500);
    }
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

  res.status(201).header({ Location: url }).send({ url });
}
