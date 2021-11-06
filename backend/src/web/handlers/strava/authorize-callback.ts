import { Request, Response } from "express";
import { URLSearchParams } from "url";
import { FRONTEND_URL, STRAVA_DEV_ACCOUNTS } from "../../../shared/config";
import { writeStravaToken } from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../services/strava";
import { Session } from "../../types";

export async function handleStravaAuthorizeCallback(
  req: Request,
  res: Response
) {
  const session: Session = req.session;
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
  const athleteId: number = responseJSON.athlete.id;

  await writeStravaToken({
    athleteId,
    expiresAt: responseJSON.expires_at,
    token: responseJSON.access_token,
    refreshToken: responseJSON.refresh_token,
  });

  const params = new URLSearchParams();

  if (STRAVA_DEV_ACCOUNTS.includes(athleteId)) {
    session.athleteId = athleteId
  }

  params.set("strava-auth", JSON.stringify(responseJSON));

  let path = "/";
  if (typeof req.query.state === "string") {
    try {
      const state: { path: string; search: Record<string, string> } =
        JSON.parse(req.query.state);

      path = state.path;
      Object.entries(state.search).forEach(([key, value]) => {
        params.set(key, value);
      });
    } catch {}
  }

  const redirectUrl = `${FRONTEND_URL}${path}?${params.toString()}`;
  res.redirect(redirectUrl);
}
