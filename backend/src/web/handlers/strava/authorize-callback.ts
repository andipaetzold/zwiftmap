import { Request, Response } from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import {
  FRONTEND_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "../../../shared/config";

export async function handleStravaAuthorizeCallback(
  req: Request,
  res: Response
) {
  const code = req.query.code;

  if (typeof code !== "string" || code.length === 0) {
    res.sendStatus(400);
    return;
  }

  const params = new URLSearchParams();
  params.set("client_id", STRAVA_CLIENT_ID);
  params.set("client_secret", STRAVA_CLIENT_SECRET);
  params.set("code", code);
  params.set("grant_type", "authorization_code");
  const url = `https://www.strava.com/api/v3/oauth/token?${params.toString()}`;

  const response = await fetch(url, { method: "POST" });
  const responseJSON = await response.json();

  const redirectParams = new URLSearchParams();
  redirectParams.set("strava-auth", JSON.stringify(responseJSON));

  let path = "/";
  if (typeof req.query.state === "string") {
    try {
      const state: { path: string; search: Record<string, string> } =
        JSON.parse(req.query.state);

      path = state.path;
      Object.entries(state.search).forEach(([key, value]) => {
        redirectParams.set(key, value);
      });
    } catch {}
  }
  const redirectUrl = `${FRONTEND_URL}${path}?${redirectParams.toString()}`;
  res.redirect(redirectUrl);
}
