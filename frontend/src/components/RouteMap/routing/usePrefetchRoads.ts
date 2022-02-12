import { useEffect } from "react";
import { LocationState } from "../../../services/location-state";
import { worker } from "../../../services/worker-client";

export function usePrefetchRoads(state: LocationState) {
  useEffect(() => {
    if (state.type !== "routing") {
      return;
    }

    worker.fetchRoads(state.world.slug);
  });
}
