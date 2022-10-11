import { Request, Response } from "express";
import { Record, String, Union } from "runtypes";
import { URLSearchParams } from "url";
import { config } from "../../../shared/config.js";
import { writeStravaToken } from "../../../shared/persistence/index.js";
import { StravaAppAPI } from "../../../shared/services/strava/index.js";
import { Session } from "../../types.js";

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

    const api = new StravaAppAPI();
    const response = await api.authorize(query.code);
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

  let redirectUrl = `${config.frontendUrl}${path}`;
  if (paramsString !== "") {
    redirectUrl += `?${paramsString}`;
  }
  res.redirect(redirectUrl);
}
