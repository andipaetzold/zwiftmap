import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { ErrorWithStatusCode } from "../../../shared/ErrorWithStatusCode";
import { shareActivity } from "../../../shared/services/sharing";
import { Session } from "../../types";

const Body = Record({
  activityId: String,
});

export async function handleShareActivity(req: Request, res: Response) {
  const session: Session = req.session;

  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const body = req.body;
  try {
    const url = await shareActivity(session.stravaAthleteId, +body.activityId);

    res.status(201).header({ Location: url }).json({ url });
  } catch (e) {
    if (e instanceof ErrorWithStatusCode) {
      Sentry.captureException(e);
      res.sendStatus(e.statusCode);
    } else {
      res.sendStatus(500);
    }
  }
}
