import { Request, Response } from "express";
import { Record, String } from "runtypes";
import short from "short-uuid";
import { Strava } from "strava";
import {
  FRONTEND_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "../../../shared/config";
import { writeSharedItem } from "../../../shared/persistence/sharedItem";
import { readStravaToken } from "../../../shared/persistence/stravaToken";
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

  const stravaToken = await readStravaToken(session.stravaAthleteId);
  if (!stravaToken) {
    res.sendStatus(403);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const body = req.body;

  const client = new Strava({
    client_id: `${STRAVA_CLIENT_ID}`,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: stravaToken.refreshToken,
  });

  const activity = await client.activities.getActivityById({
    id: +body.activityId,
  });

  if (!isZwiftActivity(activity)) {
    res.sendStatus(404);
    return;
  }

  const activityStreams = await client.streams.getActivityStreams({
    id: +body.activityId,
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
    ],
  });

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
