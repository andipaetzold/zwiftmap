import { Request, Response } from "express";
import { Record } from "runtypes";
import { NumberString } from "../../../../shared/runtypes.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const paramsRunType = Record({
  activityId: NumberString,
});

export async function handleGETActivityStreams(req: Request, res: Response) {
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
  const { result: activity, ttl } = await api.getActivityStreams(
    +req.params.activityId
  );

  res
    .status(200)
    .header("Cache-Control", `private, max-age=${ttl}`)
    .json(activity);
}
