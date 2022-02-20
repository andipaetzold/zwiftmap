import "leaflet/dist/leaflet.css";
import React from "react";
import { useAsync } from "react-async-hook";
import { useStore } from "../../hooks/useStore";
import {
  DEFAULT_WORLD,
  navigate,
  useLocationState,
} from "../../services/location-state";
import styles from "./index.module.scss";
import { loadRoute } from "./loaders/route";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

export default function RouteMap() {
  const state = useLocationState();
  const setQuery = useStore((state) => state.setQuery);

  const { result: routeStreams } = useAsync(loadRoute, [state]);

  const selectedWorld = state.world ?? DEFAULT_WORLD;

  return (
    <div className={styles.Container} aria-hidden="true">
      <WorldSelect
        world={selectedWorld}
        onWorldChange={(newWorld) => {
          setQuery("");
          if (state.type === "custom-route") {
            navigate({
              world: newWorld,
              type: "custom-route",
              points: [null, null],
            });
          } else {
            navigate({
              world: newWorld,
              type: "default",
            });
          }
        }}
      />
      <Map
        key={selectedWorld.slug}
        state={state}
        world={selectedWorld}
        routeStreams={routeStreams}
      />
    </div>
  );
}
