import { Request, Response } from "express";
import { getSegmentById } from "../../../../shared/services/strava";
import { Session } from "../../../types";

export async function handleGETSegment(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const activity = await getSegmentById(
    session.stravaAthleteId,
    +req.params.segmentId
  );
  res.header("Cache-control", "private, max-age=3600").status(200).json(activity);
}
