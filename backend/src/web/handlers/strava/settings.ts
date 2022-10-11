import { Request, Response } from "express";
import {
  readStravaAthlete,
  StravaAthleteSchema,
  writeStravaAthlete,
} from "../../../shared/persistence/index.js";
import { Session } from "../../types.js";

export async function handleGETStravaSettings(req: Request, res: Response) {
  const session = req.session as Session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const settings = await readStravaAthlete(session.stravaAthleteId);
  res.json(settings);
}

export async function handlePUTStravaSettings(req: Request, res: Response) {
  if (!StravaAthleteSchema.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  await writeStravaAthlete(session.stravaAthleteId, req.body);
  res.json(req.body);
}
