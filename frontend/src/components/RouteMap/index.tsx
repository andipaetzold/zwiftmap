import "leaflet/dist/leaflet.css";
import React from "react";
import { useAsync } from "react-async-hook";
import { useStore } from "../../hooks/useStore";
import { DEFAULT_WORLD, useLocationState } from "../../services/location-state";
import { HoverData } from "../../types";
import styles from "./index.module.scss";
import { loadPreviewRoute } from "./loaders/previewRoute";
import { loadRoute } from "./loaders/route";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute: HoverData;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const setQuery = useStore((state) => state.setQuery);

  const { result: routeStreams } = useAsync(loadRoute, [locationState]);
  const { result: previewLatLng } = useAsync(loadPreviewRoute, [previewRoute]);

  const selectedWorld = locationState.world ?? DEFAULT_WORLD;

  return (
    <div className={styles.Container} aria-hidden="true">
      <WorldSelect
        world={selectedWorld}
        onWorldChange={(newWorld) => {
          setQuery("");
          setLocationState({
            world: newWorld,
            type: "default",
          });
        }}
      />
      <Map
        key={selectedWorld.slug}
        world={selectedWorld}
        mouseHoverDistance={mouseHoverDistance}
        previewRouteLatLngStream={previewLatLng}
        routeStreams={routeStreams}
      />
    </div>
  );
}
