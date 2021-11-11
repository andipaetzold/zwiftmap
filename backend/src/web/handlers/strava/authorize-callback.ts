import { Request, Response } from "express";
import { Record, String, Union } from "runtypes";
import { URLSearchParams } from "url";
import { FRONTEND_URL } from "../../../shared/config";
import { writeStravaToken } from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../../shared/services/strava";
import { Session } from "../../types";

const SuccessQuery = Record({
  state: String,
  code: String,
  scope: String,
});

const ErrorQuery = Record({
  state: String,
  error: String,
});

const Query = Union(SuccessQuery, ErrorQuery);

export async function handleStravaAuthorizeCallback(
  req: Request,
  res: Response
) {
  const query = req.query;
  if (!Query.guard(query)) {
    res.sendStatus(400);
    return;
  }

  const params = new URLSearchParams();

  if (!("error" in query)) {
    const session: Session = req.session;

    const response = await stravaAppAPI.post("/oauth/token", {
      code: query.code,
      grant_type: "authorization_code",
    });
    const responseJSON = response.data;
    const athleteId: number = responseJSON.athlete.id;

    await writeStravaToken({
      athleteId,
      expiresAt: responseJSON.expires_at,
      token: responseJSON.access_token,
      refreshToken: responseJSON.refresh_token,
      scope: query.scope.split(","),
    });
    session.stravaAthleteId = athleteId;

    params.set("strava-auth", JSON.stringify(responseJSON));
  }

  let path = "/";
  try {
    const state: { path: string; search: { [key: string]: string } } =
      JSON.parse(query.state);

    path = state.path;
    Object.entries(state.search).forEach(([key, value]) => {
      params.set(key, value);
    });
  } catch {}
  const paramsString = params.toString();

  let redirectUrl = `${FRONTEND_URL}${path}`;
  if (paramsString !== "") {
    redirectUrl += `?${paramsString}`;
  }
  res.redirect(redirectUrl);
}
