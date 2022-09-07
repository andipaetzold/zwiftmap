import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { URLSearchParams } from "url";
import { config } from "../../../shared/config.js";

const Query = Record({
  state: String,
});

export function handleStravaAuthorize(req: Request, res: Response) {
  if (!Query.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const params = new URLSearchParams();
  params.set("client_id", config.strava.clientId.toString());
  params.set("redirect_uri", `${config.backendUrl}/strava/callback`);
  params.set("response_type", "code");
  params.set("approval_prompt", "auto");
  params.set("scope", "activity:write,activity:read_all");
  params.set("state", req.query.state);

  const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;
  res.redirect(url);
}
