import { LatLngBoundsExpression, Map as MapType } from "leaflet";
import { RefObject, useCallback, useEffect, useRef } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  ZoomControl
} from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../constants/worldConfigs";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useSettings } from "../../hooks/useSettings";
import { LocationState } from "../../services/location-state";
import { DistanceStream, LatLngStream } from "../../types";
import { getBounds } from "../../util/bounds";
import { usePrefetchRoads } from "./custom-route/usePrefetchRoads";
import styles from "./index.module.scss";
import { Markers } from "./Markers";
import { OverlayDebugRoads } from "./overlays/OverlayDebugRoad";
import { OverlayDebugSurfaces } from "./overlays/OverlayDebugSurfaces";
import { OverlayFog } from "./overlays/OverlayFog";
import { OverlayNone } from "./overlays/OverlayNone";
import { OverlaySegments } from "./overlays/OverlaySegments";
import { OverlaySurfaces } from "./overlays/OverlaySurfaces";
import { PreviewRoute } from "./PreviewRoute";
import { RoutePosition } from "./RoutePosition";
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

  const mapRef = useRef<MapType>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const minZoom = mapRef.current.getBoundsZoom(world.bounds, false);
    mapRef.current.setMinZoom(minZoom);
  }, [mapRef.current, world.bounds]);

  const flyToBounds = useFlyToBounds(mapRef);
  const firstLoad = useRef<boolean>(true);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const worldConfig = worldConfigs[world.slug];

    mapRef.current.invalidateSize();

    if (state.type === "default") {
      if (firstLoad.current) {
        mapRef.current.fitBounds(worldConfig.initialBounds, { animate: false });
        firstLoad.current = false;
      } else {
        flyToBounds(worldConfig.initialBounds);
      }
    } else if (routeStreams) {
      if (state.type === "custom-route" && !firstLoad.current) {
        // only fly to custom route on first load
      } else {
        const bounds = getBounds(routeStreams.latlng);

        if (firstLoad.current) {
          mapRef.current.fitBounds(bounds, { animate: false });
          firstLoad.current = false;
        } else {
          flyToBounds(bounds);
        }
      }
    }
  }, [mapRef.current, routeStreams, world, state.type, flyToBounds]);

  const worldConfig = worldConfigs[world.slug];

  return (
    <MapContainer
      ref={mapRef}
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

        <OverlayFog world={world} stream={routeStreams?.latlng} />

        <OverlayDebugSurfaces world={world} />
        <OverlayDebugRoads world={world} />
      </LayersControl>

      <RoutePosition streams={routeStreams} />
      <Markers state={state} streams={routeStreams} />
    </MapContainer>
  );
}

function useFlyToBounds(mapRef: RefObject<MapType>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return useCallback(
    (bounds: LatLngBoundsExpression) => {
      if (!mapRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        mapRef.current.fitBounds(bounds, { animate: false });
      } else {
        mapRef.current.flyToBounds(bounds);
      }
    },
    [mapRef, prefersReducedMotion]
  );
}
