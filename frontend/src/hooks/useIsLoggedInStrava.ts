import { useEffect, useState } from "react";
import { AuthStatusLoading, getCachedAuthStatus } from "../services/auth";
import { AUTH_STATUS_UPDATE, emitter } from "../services/emitter";
import { AuthStatus } from "../types";

export type IsLoggedInStrava = boolean | null;

function authStatusToState(
  authStatus: AuthStatus | typeof AuthStatusLoading
): IsLoggedInStrava {
  if (authStatus === AuthStatusLoading) {
    return null;
  }

  if (authStatus === null) {
    return false;
  }

  return authStatus.strava;
}

export function useIsLoggedInStrava(): IsLoggedInStrava {
  const [state, setState] = useState<IsLoggedInStrava>(null);

  useEffect(() => {
    setState(authStatusToState(getCachedAuthStatus()));

    const listener = (newAuthStatus: AuthStatus) => {
      setState(authStatusToState(newAuthStatus));
    };

    emitter.on(AUTH_STATUS_UPDATE, listener);
    return () => emitter.off(AUTH_STATUS_UPDATE, listener);
  }, []);

  return state;
}
