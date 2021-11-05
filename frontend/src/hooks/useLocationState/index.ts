import { useCallback, useEffect, useState } from "react";
import { LocationState } from "../../types";
import { createUrl } from "./createUrl";
import { getLocationState } from "./getLocationState";

type Listener = (state: LocationState) => void;
const listeners: Listener[] = [];

export function useLocationState(): [
  LocationState,
  (s: LocationState) => void
] {
  const [state, setState] = useState(getLocationState);

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

  return [state, updateLocationState];
}
