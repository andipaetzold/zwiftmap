import { Request, Response } from "express";
import { Record } from "runtypes";
import { NumberString } from "../../../../shared/runtypes.js";
import { CachedStravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const paramsRunType = Record({
  segmentId: NumberString,
});

export async function handleGETSegment(req: Request, res: Response) {
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
  const { result: activity, ttl } = await api.getSegmentById(
    +req.params.segmentId
  );

  res
    .status(200)
    .header("Cache-Control", `private, max-age=${ttl}`)
    .json(activity);
}
