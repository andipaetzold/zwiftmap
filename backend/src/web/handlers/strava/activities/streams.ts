import { Request, Response } from "express";
import { getActivityStreams } from "../../../../shared/services/strava";
import { Session } from "../../../types";

export async function handleGETActivityStreams(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const { result: activity } = await getActivityStreams(
    session.stravaAthleteId,
    +req.params.activityId
  );
  res.status(200).json(activity);
}
