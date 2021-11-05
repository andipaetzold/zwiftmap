import { useCallback, useEffect, useState } from "react";
import { LocationState } from "../../types";
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
    const searchParams = new URLSearchParams();
    searchParams.set("world", newState.world.slug);
    if (newState.query.length > 0) {
      searchParams.set("q", newState.query);
    }

    switch (newState.type) {
      case "default":
        break;
      case "route":
        searchParams.set("route", newState.route.slug);
        if (newState.segments.length > 0) {
          searchParams.set(
            "segments",
            newState.segments.map((s) => s.slug).join(",")
          );
        }
        break;

      case "strava-activities":
        searchParams.set("strava-activities", "");
        break;

      case "strava-activity":
        searchParams.set("strava-activity", newState.stravaActivityId);
        break;
    }

    window.history.pushState(undefined, "", `?${searchParams.toString()}`);
    setState(newState);
    listeners.forEach((l) => l(newState));
  }, []);

  return [state, updateLocationState];
}
