import { Request, Response } from "express";
import { URLSearchParams } from "url";
import { BACKEND_URL, STRAVA_CLIENT_ID } from "../../../shared/config";

export function handleStravaAuthorize(req: Request, res: Response) {
  const params = new URLSearchParams();
  params.set("client_id", STRAVA_CLIENT_ID);
  params.set("redirect_uri", `${BACKEND_URL}/strava/callback`);
  params.set("response_type", "code");
  params.set("approval_prompt", "auto");
  params.set("scope", "activity:read_all");
  params.set("state", (req.query.state as string) ?? "{}");
  const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;

  res.redirect(url);
}
