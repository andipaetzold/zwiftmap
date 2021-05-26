import { URL, URLSearchParams } from "url";
import {
  BACKEND_URL,
  FRONTEND_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "./config";
import fetch from "node-fetch";
import { Express } from "express";

export function initStravaHandlers(app: Express) {
  app.get("/strava/authorize", (req, res) => {
    const params = new URLSearchParams();
    params.set("client_id", STRAVA_CLIENT_ID);
    params.set("redirect_uri", `${BACKEND_URL}/strava/callback`);
    params.set("response_type", "code");
    params.set("approval_prompt", "auto");
    params.set("scope", "activity:read_all");
    params.set("state", (req.query.state as string) ?? "{}");
    const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;

    res.redirect(url);
  });

  app.get("/strava/callback", async (req, res) => {
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
    if (typeof req.query.state === "string") {
      try {
        const state: Record<string, string> = JSON.parse(req.query.state);
        Object.entries(state).forEach(([key, value]) => {
          redirectParams.set(key, value);
        });
      } catch {}
    }
    const redirectUrl = `${FRONTEND_URL}?${redirectParams.toString()}`;
    res.redirect(redirectUrl);
  });

  app.post("/strava/refresh", async (req, res) => {
    const refreshToken = req.body.refresh_token;

    if (typeof refreshToken !== "string" || refreshToken.length === 0) {
      res.sendStatus(400);
      return;
    }

    const params = new URLSearchParams();
    params.set("client_id", STRAVA_CLIENT_ID);
    params.set("client_secret", STRAVA_CLIENT_SECRET);
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", refreshToken);
    const url = `https://www.strava.com/api/v3/oauth/token?${params.toString()}`;

    const response = await fetch(url, { method: "POST" });
    const responseJSON = await response.json();

    res.send(responseJSON);
  });
}
