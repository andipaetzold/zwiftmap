import { Request, Response } from "express";
import { getSegmentById } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

export async function handleGETSegment(req: Request, res: Response) {
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
