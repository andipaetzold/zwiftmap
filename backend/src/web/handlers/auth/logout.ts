import axios from "axios";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { AUTH_COOKIE_NAME, STRAVA_DEV_ACCOUNTS } from "../../../shared/config";
import { Session } from "../../types";

const Body = Record({
  stravaToken: String,
});

export async function handleLogout(req: Request, res: Response) {
  const session = req.session as Session;
  if (session.athleteId && STRAVA_DEV_ACCOUNTS.includes(session.athleteId)) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    res.clearCookie(AUTH_COOKIE_NAME);
  } else if (Body.guard(req.body)) {
    try {
      await axios.post("https://www.strava.com/oauth/deauthorize", undefined, {
        params: { access_token: req.body.stravaToken },
      });
    } catch {}
  }

  res.sendStatus(204);
}
