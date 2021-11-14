import axios from "axios";
import { Request, Response } from "express";
import { Optional, Record, String } from "runtypes";
import { updateActivity } from "../../../../shared/services/strava";
import { Session } from "../../../types";

const Body = Record({
  description: Optional(String),
});

export async function handlePUTActivity(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!Body.guard(body)) {
      res.sendStatus(400);
      return;
    }

    const session = req.session as Session;
    if (!session.stravaAthleteId) {
      res.sendStatus(403);
      return;
    }

    const activity = await updateActivity(
      session.stravaAthleteId,
      +req.params.activityId,
      body
    );
    res.status(200).json(activity);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.sendStatus(error.response.status);
    } else {
      res.sendStatus(500);
    }
  }
}
