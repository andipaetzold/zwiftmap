import { URL, URLSearchParams } from "url";
import {
  BACKEND_URL,
  FRONTEND_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "./config";
import { app } from "./server";
import fetch from "node-fetch";

app.get("/strava/authorize", (req, res) => {
  const params = new URLSearchParams();
  params.set("client_id", STRAVA_CLIENT_ID);
  params.set("redirect_uri", `${BACKEND_URL}/strava/callback`);
  params.set("response_type", "code");
  params.set("approval_prompt", "auto");
  params.set("scope", "activity:read_all");
  params.set("state", (req.query.state as string) ?? "");
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

  const accessToken = responseJSON.access_token;

  if (typeof accessToken !== "string") {
    res.send("Error");
  } else {
    const redirectParams = new URLSearchParams();
    redirectParams.set("strava-access-token", responseJSON.access_token);
    if (
      req.query.state &&
      (req.query.state as string).startsWith("activity:")
    ) {
      redirectParams.set(
        "strava-activity",
        (req.query.state as string).substr("activity:".length)
      );
    }
    const redirectUrl = `${FRONTEND_URL}?${redirectParams.toString()}`;
    res.redirect(redirectUrl);
  }
});
