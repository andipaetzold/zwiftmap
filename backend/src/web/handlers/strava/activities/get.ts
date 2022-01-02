import { Request, Response } from "express";
import { ONE_HOUR } from "../../../../constants";
import { getActivityById } from "../../../../shared/services/strava";
import { isZwiftActivity } from "../../../../shared/util";
import { Session } from "../../../types";

export async function handleGETActivity(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const activity = await getActivityById(
    session.stravaAthleteId,
    +req.params.activityId
  );

  if (isZwiftActivity(activity)) {
    res.header("Cache-control", `private, max-age=${ONE_HOUR}`).status(200).json(activity);
  } else {
    res.sendStatus(404);
  }
}
