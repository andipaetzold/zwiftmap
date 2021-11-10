import { useCallback, useEffect, useState } from "react";
import { createUrl } from "./createUrl";
import {
  addListener,
  getLocationState,
  removeListener,
  setLocationState,
} from "./state";
import { LocationState, LocationStateWithKey } from "./types";

export function useLocationState<
  State extends LocationState = LocationState
>(): [State & { key: string }, (s: LocationState) => void] {
  const [state, setState] = useState<LocationStateWithKey>(getLocationState);

  useEffect(() => {
    setState(getLocationState());
    addListener(setState);
    return () => removeListener(setState);
  }, []);

  const handleSetState = useCallback((newState: LocationState) => {
    const url = createUrl(newState);
    window.history.pushState(undefined, "", url);
    setLocationState(newState);
  }, []);

  return [state as State & { key: string }, handleSetState];
}
