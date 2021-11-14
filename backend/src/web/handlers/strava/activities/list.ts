import { Request, Response } from "express";
import { getActivities } from "../../../../shared/services/strava";
import { Session } from "../../../types";
import { Optional, Record, String } from "runtypes";
import { NumberString } from "../../../services/runtypes";
import axios from "axios";

const Query = Record({
  before: Optional(NumberString),
  after: Optional(NumberString),
  page: Optional(NumberString),
  per_page: Optional(NumberString),
});

export async function handleGETActivities(req: Request, res: Response) {
  try {
    const query = req.query;

    if (!Query.guard(query)) {
      res.sendStatus(400);
      return;
    }

    const session = req.session as Session;
    if (!session.stravaAthleteId) {
      res.sendStatus(403);
      return;
    }

    const activities = await getActivities(session.stravaAthleteId, {
      before: query.before === undefined ? undefined : +query.before,
      after: query.after === undefined ? undefined : +query.after,
      page: query.page === undefined ? undefined : +query.page,
      per_page: query.per_page === undefined ? undefined : +query.per_page,
    });
    res.status(200).json(activities);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.sendStatus(error.response.status);
    } else {
      res.sendStatus(500);
    }
  }
}
