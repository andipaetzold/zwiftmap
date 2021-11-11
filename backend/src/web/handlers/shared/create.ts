import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { Literal, Record, Number } from "runtypes";
import { ErrorWithStatusCode } from "../../../shared/ErrorWithStatusCode";
import { SharedItem } from "../../../shared/persistence/sharedItem";
import { shareActivity } from "../../../shared/services/sharing";
import { Session } from "../../types";

const Body = Record({
  type: Literal("strava-activity"),
  stravaActivityId: Number,
});

export async function handleCreateSharedItem(req: Request, res: Response) {
  const session = req.session as Session;

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  try {
    let sharedItem: SharedItem;
    switch (req.body.type) {
      case "strava-activity": {
        sharedItem = await handleStravaActivity(
          session,
          req.body.stravaActivityId
        );
        break;
      }
    }

    res.status(201).json(sharedItem);
  } catch (e) {
    if (e instanceof ErrorWithStatusCode) {
      Sentry.captureException(e);
      res.sendStatus(e.statusCode);
    } else {
      res.sendStatus(500);
    }
  }
}

async function handleStravaActivity(
  session: Session,
  stravaActivityId: number
): Promise<SharedItem> {
  if (!session.stravaAthleteId) {
    throw new ErrorWithStatusCode("Not authenticated with Strava", 403);
  }

  return await shareActivity(session.stravaAthleteId, stravaActivityId);
}
