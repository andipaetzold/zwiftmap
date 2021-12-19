import { createUrl } from "./createUrl";
import { setLocationState } from "./state";
import { LocationState } from "./types";

export function navigate(state: LocationState) {
  const url = createUrl(state);
  window.history.pushState(undefined, "", url);
  setLocationState(state);
}
