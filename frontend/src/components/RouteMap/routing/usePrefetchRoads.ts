import { useEffect } from "react";
import { useLocationState } from "../../../services/location-state";
import { worker } from "../../../services/worker-client";

export function usePrefetchRoads() {
  const state = useLocationState();

  useEffect(() => {
    if (state.type !== "routing") {
      return;
    }

    worker.fetchRoads(state.world.slug);
  });
}
