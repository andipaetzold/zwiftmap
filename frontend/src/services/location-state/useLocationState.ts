import { useCallback, useEffect, useState } from "react";
import { createUrl } from "./createUrl";
import {
  addStateListener,
  getLocationState,
  removeStateListener,
  setLocationState,
} from "./state";
import { LocationState, LocationStateWithKey } from "./types";

export function useLocationState<
  State extends LocationState = LocationState
>(): [State & { key: string }, (s: LocationState) => void] {
  const [state, setState] = useState<LocationStateWithKey>(getLocationState);

  useEffect(() => {
    setState(getLocationState());
    addStateListener(setState);
    return () => removeStateListener(setState);
  }, []);

  const handleSetState = useCallback((newState: LocationState) => {
    const url = createUrl(newState);
    window.history.pushState(undefined, "", url);
    setLocationState(newState);
  }, []);

  return [state as State & { key: string }, handleSetState];
}
