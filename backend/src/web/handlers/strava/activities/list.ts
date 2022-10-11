import { Request, Response } from "express";
import { CachedStravaUserAPI, SummaryActivity } from "../../../../shared/services/strava/index.js";
import { isZwiftActivity } from "../../../../shared/util.js";
import { Session } from "../../../types.js";

const PER_PAGE = 200;

const MONTH_IN_SECONDS = 6 * 30 * 24 * 60 * 60;
const NOW = new Date().getTime() / 1_000;

export async function handleGETActivities(req: Request, res: Response) {
  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  let page = 1;
  const activities: SummaryActivity[] = [];
  let newActivities: SummaryActivity[];

  const api = new CachedStravaUserAPI(session.stravaAthleteId);
  do {
    newActivities = await api.getActivities({
      after: NOW - MONTH_IN_SECONDS,
      page,
      per_page: PER_PAGE,
    });
    activities.push(...newActivities);
    ++page;
  } while (newActivities.length === PER_PAGE);

  const filteredAndSortedActivities = activities
    .filter(isZwiftActivity)
    .sort((a, b) => -a.start_date.localeCompare(b.start_date));

  res.status(200).json(filteredAndSortedActivities);
}
