import axios from "axios";
import { Request, Response } from "express";
import { SummaryActivity } from "strava";
import { getActivities } from "../../../../shared/services/strava";
import { Session } from "../../../types";

const PER_PAGE = 30;

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
const NOW = new Date().getTime() / 1_000;

export async function handleGETActivities(req: Request, res: Response) {
  try {
    const session = req.session as Session;
    if (!session.stravaAthleteId) {
      res.sendStatus(403);
      return;
    }

    let page = 1;
    const activities: SummaryActivity[] = [];
    let newActivities: SummaryActivity[];

    do {
      newActivities = await getActivities(session.stravaAthleteId, {
        after: NOW - MONTH_IN_SECONDS,
        page,
        per_page: PER_PAGE,
      });
      activities.push(...newActivities);
      ++page;
    } while (newActivities.length === PER_PAGE);

    res.status(200).json(activities);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.sendStatus(error.response.status);
    } else {
      res.sendStatus(500);
    }
  }
}
