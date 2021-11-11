import mitt from "mitt";
import { RefreshTokenResponse } from "strava/dist/types";

export const STRAVA_TOKEN_UPDATE = Symbol("STRAVA_TOKEN_UPDATE");

type Events = {
  [STRAVA_TOKEN_UPDATE]: RefreshTokenResponse | null;
};

export const emitter = mitt<Events>();
