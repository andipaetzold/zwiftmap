import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { useStore } from "../../hooks/useStore";
import {
  DEFAULT_WORLD, useLocationState
} from "../../services/location-state";
import { HoverData } from "../../types";
import styles from "./index.module.scss";
import { loadPreviewRoute } from "./loaders/previewRoute";
import { loadRoute } from "./loaders/route";
import { loadSegments } from "./loaders/segments";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute: HoverData;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const setQuery = useStore((state) => state.setQuery);

  const { result: segmentsWithLatLng } = useAsync(loadSegments, [
    locationState,
  ]);

  const { result: routeStreamSet } = useAsync<
    | {
        latlng: LatLngTuple[];
        distance: number[];
      }
    | undefined
  >(loadRoute, [locationState]);

  const { result: previewLatLng } = useAsync<LatLngTuple[] | undefined>(
    loadPreviewRoute,
    [previewRoute]
  );

  const pointCoordinates = useMemo<LatLngTuple | undefined>(() => {
    if (!routeStreamSet || !mouseHoverDistance) {
      return;
    }

    const pointIndex = routeStreamSet.distance.findIndex(
      (d) => d > mouseHoverDistance * 1_000
    );
    if (!pointIndex) {
      return;
    }
    return routeStreamSet.latlng[pointIndex];
  }, [routeStreamSet, mouseHoverDistance]);

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
        hoverPoint={pointCoordinates}
        previewRouteLatLngStream={previewLatLng}
        routeLatLngStream={routeStreamSet?.latlng}
        segments={segmentsWithLatLng}
      />
    </div>
  );
}
