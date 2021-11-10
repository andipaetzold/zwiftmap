import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { routes, worlds } from "zwift-data";
import { fetchEvent } from "../events";
import { getStravaActivity } from "../StravaActivityRepository";
import { getKeyFromLocationState } from "./getKeyFromLocationState";
import { getLocationStateFromUrl } from "./getLocationStateFromUrl";
import { LocationState, LocationStateWithKey } from "./types";

export type Listener = (newState: LocationStateWithKey) => void;
const listeners: Listener[] = [];

const INITIAL_STATE: LocationState = getLocationStateFromUrl();
const INITIAL_STATE_WITH_KEY = {
  ...INITIAL_STATE,
  key: getKeyFromLocationState(INITIAL_STATE),
};

let state: LocationStateWithKey = INITIAL_STATE_WITH_KEY;

export function setLocationState(newState: LocationState) {
  const key = getKeyFromLocationState(newState);
  state = { ...newState, key };
  listeners.forEach((l) => l(state));
  fetchWorld();
}

export function getLocationState(): LocationStateWithKey {
  return state;
}

export function addListener(listener: Listener) {
  listeners.push(listener);
}

export function removeListener(listener: Listener) {
  listeners.splice(listeners.indexOf(listener), 1);
}

fetchWorld();
async function fetchWorld() {
  if (state.world === null) {
    const stateBefore = cloneDeep(state);
    switch (state.type) {
      case "strava-activity":
        const activity = await getStravaActivity(state.stravaActivityId);
        if (isEqual(stateBefore, state)) {
          setLocationState({ ...state, world: activity.world });
        }

        break;
      case "event":
        const event = await fetchEvent(state.eventId);
        if (isEqual(stateBefore, state)) {
          const worldId = event.mapId;
          const worldSlug = routes.find((r) => r.id === event.routeId)?.world;
          const world = worlds.find(
            (w) => w.id === worldId || w.slug === worldSlug
          );

          if (world) {
            setLocationState({ ...state, world });
          }
        }

        break;
    }
  }
}

window.addEventListener("popstate", () => {
  const newState = getLocationStateFromUrl();
  setLocationState(newState);
});
