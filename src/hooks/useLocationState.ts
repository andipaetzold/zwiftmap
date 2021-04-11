import { useCallback, useEffect, useState } from "react";
import { routes, worlds } from "../data";
import { LocationState } from "../types";

const DEFAULT_WORLD = worlds.find((w) => w.slug === "watopia")!;

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
    if (newState.route) {
      searchParams.set("route", newState.route.slug);
    }

    window.history.pushState(undefined, "", `?${searchParams.toString()}`);
    setState(newState);
    listeners.forEach((l) => l(newState));
  }, []);

  return [state, updateLocationState];
}


function getLocationState(): LocationState {
  const searchParams = new URLSearchParams(window.location.search);

  const world =
    worlds.find((w) => w.slug === searchParams.get("world")) ?? DEFAULT_WORLD;

  const route = routes
    .filter((r) => r.world === world?.slug)
    .find((r) => r.slug === searchParams.get("route"));

  return { world, route };
}
