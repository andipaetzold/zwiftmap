import { Request, Response } from "express";
import { SummaryActivity } from "strava";
import { ErrorWithStatusCode } from "../../../../shared/ErrorWithStatusCode";
import { getActivities } from "../../../../shared/services/strava";
import { isZwiftActivity } from "../../../../shared/util";
import { Session } from "../../../types";

const PER_PAGE = 30;

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
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

  do {
    newActivities = await getActivities(session.stravaAthleteId, {
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
