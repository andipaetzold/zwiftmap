import { Request, Response } from "express";
import { URLSearchParams } from "url";
import { FRONTEND_URL } from "../../../shared/config";
import { writeStravaToken } from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../services/strava";

export async function handleStravaAuthorizeCallback(
  req: Request,
  res: Response
) {
  const code = req.query.code;

  if (typeof code !== "string" || code.length === 0) {
    res.sendStatus(400);
    return;
  }

  const response = await stravaAppAPI.post("/oauth/token", {
    code: code,
    grant_type: "authorization_code",
  });
  const responseJSON = response.data;

  await writeStravaToken({
    athleteId: responseJSON.athlete.id,
    expiresAt: responseJSON.expires_at,
    token: responseJSON.access_token,
    refreshToken: responseJSON.refresh_token,
  });

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
