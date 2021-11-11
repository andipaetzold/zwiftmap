import { RefreshTokenResponse } from "strava/dist/types";
import { emitter, STRAVA_TOKEN_UPDATE } from "../emitter";

export const StravaTokenLoading = Symbol("Strava Token Loading");

let token: RefreshTokenResponse | null | typeof StravaTokenLoading =
  StravaTokenLoading;

export function getStravaToken():
  | RefreshTokenResponse
  | null
  | typeof StravaTokenLoading {
  return token;
}

export function writeStravaToken(newToken: RefreshTokenResponse | null): void {
  token = newToken;
  emitter.emit(STRAVA_TOKEN_UPDATE, token);
}
