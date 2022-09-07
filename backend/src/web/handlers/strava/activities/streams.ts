import { Request, Response } from "express";
import { getActivityStreams } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

export async function handleGETActivityStreams(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const { result: activity, ttl } = await getActivityStreams(
    session.stravaAthleteId,
    +req.params.activityId
  );
  res
    .status(200)
    .header("Cache-Control", `private, max-age=${ttl}`)
    .json(activity);
}
