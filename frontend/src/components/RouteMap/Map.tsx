import { Map as MapType } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  ZoomControl,
} from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../constants/worldConfigs";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useSettings } from "../../hooks/useSettings";
import { LocationState } from "../../services/location-state";
import { DistanceStream, LatLngStream } from "../../types";
import { getBounds } from "../../util/bounds";
import styles from "./index.module.scss";
import { Markers } from "./Markers";
import { OverlayNone } from "./overlays/OverlayNone";
import { OverlaySegments } from "./overlays/OverlaySegments";
import { OverlaySurfaces } from "./overlays/OverlaySurfaces";
import { PreviewRoute } from "./PreviewRoute";
import { RoadLayer } from "./RoadLayer";
import { RoutePosition } from "./RoutePosition";
import { usePrefetchRoads } from "./routing/usePrefetchRoads";
import { SurfaceDebugLayer } from "./SurfaceDebugLayer";
import { WorldImage } from "./WorldImage";

interface Props {
  state: LocationState;
  world: World;
  routeStreams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function Map({ state, world, routeStreams }: Props) {
  usePrefetchRoads(state);
  const [overlay, setOverlay] = useSettings((state) => [
    state.overlay,
    state.setOverlay,
  ]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [map, setMap] = useState<MapType | undefined>();

  useEffect(() => {
    if (map === undefined) {
      return;
    }
    const minZoom = map.getBoundsZoom(world.bounds, false);
    map.setMinZoom(minZoom);
  }, [map, world.bounds]);

  const firstLoad = useRef<boolean>(true);
  useEffect(() => {
    if (!map) {
      return;
    }

    const worldConfig = worldConfigs[world.slug];

    map.invalidateSize();

    if (state.type === "default") {
      if (firstLoad.current || prefersReducedMotion) {
        map.fitBounds(worldConfig.initialBounds, { animate: false });
        firstLoad.current = false;
      } else {
        map.flyToBounds(worldConfig.initialBounds);
      }
    } else if (routeStreams) {
      if (state.type === "routing" && !firstLoad.current) {
        // only fly to custom route on first load
      } else {
        const bounds = getBounds(routeStreams.latlng);

        if (firstLoad.current || prefersReducedMotion) {
          map.fitBounds(bounds, { animate: false });
          firstLoad.current = false;
        } else {
          map.flyToBounds(bounds);
        }
      }
    }
  }, [map, routeStreams, world, prefersReducedMotion, state.type]);

  const worldConfig = worldConfigs[world.slug];

  return (
    <MapContainer
      whenCreated={setMap}
      bounds={world.bounds}
      maxBounds={world.bounds}
      style={{ backgroundColor: worldConfig.backgroundColor }}
      zoomSnap={0.5}
      maxZoom={19}
      className={styles.MapContainer}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <WorldImage world={world} />
      <PreviewRoute />

      <LayersControl position="topright">
        <LayersControl.BaseLayer name="None" checked={overlay === "none"}>
          <LayerGroup eventHandlers={{ add: () => setOverlay("none") }}>
            <OverlayNone state={state} streams={routeStreams} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Segments"
          checked={overlay === "segments"}
        >
          <LayerGroup eventHandlers={{ add: () => setOverlay("segments") }}>
            <OverlaySegments state={state} streams={routeStreams} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Surfaces"
          checked={overlay === "surfaces"}
        >
          <LayerGroup eventHandlers={{ add: () => setOverlay("surfaces") }}>
            <OverlaySurfaces state={state} streams={routeStreams} />
          </LayerGroup>
        </LayersControl.BaseLayer>

        <SurfaceDebugLayer world={world} />
        <RoadLayer world={world} />
      </LayersControl>

      <RoutePosition streams={routeStreams} />
      <Markers state={state} />
    </MapContainer>
  );
}
