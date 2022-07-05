import { Request, Response } from "express";
import { getActivityById } from "../../../../shared/services/strava";
import { isZwiftActivity } from "../../../../shared/util";
import { Session } from "../../../types";

export async function handleGETActivity(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const { result: activity, ttl } = await getActivityById(
    session.stravaAthleteId,
    +req.params.activityId
  );

  if (isZwiftActivity(activity)) {
    res
      .status(200)
      .header("Cache-Control", `private, max-age=${ttl}`)
      .json(activity);
  } else {
    res.sendStatus(404);
  }
}
