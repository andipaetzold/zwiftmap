import { useCallback, useEffect, useMemo, useState } from "react";
import { LocationState } from "../../types";
import { createUrl } from "./createUrl";
import { getKeyFromLocationState } from "./getKeyFromLocationState";
import { getLocationState } from "./getLocationState";

type Listener = (state: LocationState) => void;
const listeners: Listener[] = [];

export function useLocationState(): [
  LocationState & { key: string },
  (s: LocationState) => void
] {
  const [state, setState] = useState(getLocationState);
  const stateWithKey = useMemo(() => {
    return {
      ...state,
      key: getKeyFromLocationState(state),
    };
  }, [state]);

  useEffect(() => {
    const listener = () => setState(getLocationState());
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);

  useEffect(() => {
    const listener: Listener = (newState) => setState(newState);
    listeners.push(listener);

    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }, []);

  const updateLocationState = useCallback((newState: LocationState) => {
    const url = createUrl(newState);
    window.history.pushState(undefined, "", url);
    setState(newState);
    listeners.forEach((l) => l(newState));
  }, []);

  return [stateWithKey, updateLocationState];
}
