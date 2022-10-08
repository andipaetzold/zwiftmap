import { Request, Response } from "express";
import { Optional, Record, String } from "runtypes";
import { NumberString } from "../../../../shared/runtypes.js";
import { StravaUserAPI } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const paramsRunType = Record({
  activityId: NumberString,
});

const bodyRunType = Record({
  description: Optional(String),
});

export async function handlePUTActivity(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!bodyRunType.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const api = new StravaUserAPI(session.stravaAthleteId);
  const activity = await api.updateActivity(+req.params.activityId, req.body);
  res.status(200).json(activity);
}
