import { Request, Response } from "express";
import { ONE_HOUR } from "../../../constants";
import {
  readStravaSettings,
  writeStravaSettings,
} from "../../../shared/persistence/stravaSettings";
import { StravaSettings } from "../../../shared/persistence/types";
import { Session } from "../../types";

export async function handleGETStravaSettings(req: Request, res: Response) {
  const session = req.session as Session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const settings = await readStravaSettings(session.stravaAthleteId);
  res.header("Cache-control", "no-store").json(settings);
}

export async function handlePUTStravaSettings(req: Request, res: Response) {
  if (!StravaSettings.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  await writeStravaSettings(session.stravaAthleteId, req.body);
  res.header("Cache-control", `private, max-age=${ONE_HOUR}`).json(req.body);
}
