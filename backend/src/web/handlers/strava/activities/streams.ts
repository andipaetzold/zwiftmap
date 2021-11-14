import axios from "axios";
import { Request, Response } from "express";
import { getActivityStreams } from "../../../../shared/services/strava";
import { Session } from "../../../types";

export async function handleGETActivityStreams(req: Request, res: Response) {
  try {
    const session = req.session as Session;
    if (!session.stravaAthleteId) {
      res.sendStatus(403);
      return;
    }

    const activity = await getActivityStreams(
      session.stravaAthleteId,
      +req.params.activityId
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
