import { Request, Response } from "express";
import { Record } from "runtypes";
import { NumberString } from "../../../../shared/runtypes.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { isZwiftActivity } from "../../../../shared/util.js";
import { Session } from "../../../types.js";

const paramsRunType = Record({
  activityId: NumberString,
});

export async function handleGETActivity(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const api = new CachedStravaUserAPI(session.stravaAthleteId);
  const { result: activity } = await api.getActivityById(
    +req.params.activityId
  );

  if (isZwiftActivity(activity)) {
    res.status(200).json(activity);
  } else {
    res.sendStatus(404);
  }
}
