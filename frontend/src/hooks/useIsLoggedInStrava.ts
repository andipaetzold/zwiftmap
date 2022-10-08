import { useAuthStatus } from "../react-query/useAuthStatus";

export type IsLoggedInStrava = boolean | null;

export function useIsLoggedInStrava(): IsLoggedInStrava {
  const { data: authStatus } = useAuthStatus();

  if (authStatus === undefined) {
    return null;
  }

  return authStatus.strava;
}
