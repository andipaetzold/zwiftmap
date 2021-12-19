import { useEffect, useState } from "react";
import {
  addStateListener,
  getLocationState,
  removeStateListener,
} from "./state";
import { LocationStateWithKey } from "./types";

export function useLocationState(): LocationStateWithKey {
  const [state, setState] = useState<LocationStateWithKey>(getLocationState);

  useEffect(() => {
    setState(getLocationState());
    addStateListener(setState);
    return () => removeStateListener(setState);
  }, []);

  return state;
}
