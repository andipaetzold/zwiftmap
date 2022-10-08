import { Request, Response } from "express";
import { Record } from "runtypes";
import { getSegmentById } from "../../../../shared/services/strava/index.js";
import { NumberString } from "../../../../shared/runtypes.js";
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

  const { result: activity, ttl } = await getSegmentById(
    session.stravaAthleteId,
    +req.params.segmentId
  );

  res
    .status(200)
    .header("Cache-Control", `private, max-age=${ttl}`)
    .json(activity);
}
