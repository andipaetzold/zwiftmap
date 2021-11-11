import { useEffect, useState } from "react";
import { RefreshTokenResponse } from "strava/dist/types";
import { emitter, STRAVA_TOKEN_UPDATE } from "../services/emitter";
import { getStravaToken, StravaTokenLoading } from "../services/strava/token";

export type IsLoggedInStrava = boolean | null;

function stravaTokenToState(
  stravaToken: RefreshTokenResponse | null | typeof StravaTokenLoading
): IsLoggedInStrava {
  if (stravaToken === StravaTokenLoading) {
    return null;
  }

  if (stravaToken === null) {
    return false;
  }

  return true;
}

export function useIsLoggedInStrava(): IsLoggedInStrava {
  const [state, setState] = useState<IsLoggedInStrava>(
    stravaTokenToState(getStravaToken())
  );

  useEffect(() => {
    const listener = (newToken: RefreshTokenResponse | null) => {
      setState(stravaTokenToState(newToken));
    };

    emitter.on(STRAVA_TOKEN_UPDATE, listener);
    return () => emitter.off(STRAVA_TOKEN_UPDATE, listener);
  }, []);

  return state;
}
