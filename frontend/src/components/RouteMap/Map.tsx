import { LatLngBounds, LatLngBoundsExpression, Map as MapType } from "leaflet";
import { RefObject, useCallback, useEffect, useRef } from "react";
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
import { DistanceStream, LatLngStream, Place } from "../../types";
import { getBounds } from "../../util/bounds";
import { usePrefetchRoads } from "./custom-route/usePrefetchRoads";
import { Fog } from "./Fog";
import styles from "./index.module.scss";
import { Markers } from "./Markers";
import { OverlayDebugRoads } from "./overlays/OverlayDebugRoad";
import { OverlayDebugSurfaces } from "./overlays/OverlayDebugSurfaces";
import { OverlayHeatmap } from "./overlays/OverlayHeatmap";
import { OverlayNone } from "./overlays/OverlayNone";
import { OverlaySegments } from "./overlays/OverlaySegments";
import { OverlaySurfaces } from "./overlays/OverlaySurfaces";
import { HoverStateOverlay } from "./HoverStateOverlay";
import { RoutePosition } from "./RoutePosition";
import { WorldImage } from "./WorldImage";

interface Props {
  state: LocationState;
  world: World;
  routeStreams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
  place?: Place;
}

export function Map({ state, world, routeStreams, place }: Props) {
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
    // TODO: do not depend on ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current, world.bounds]);

  const flyToBounds = useFlyToBounds(mapRef);
  const firstLoad = useRef<boolean>(true);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const worldConfig = worldConfigs[world.slug];

    mapRef.current.invalidateSize();

    if (["default", "fog"].includes(state.type)) {
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
    } else if (place) {
      const bounds = new LatLngBounds(place.position, place.position);
      if (firstLoad.current) {
        mapRef.current.fitBounds(bounds, { animate: false });
        firstLoad.current = false;
      } else {
        flyToBounds(bounds);
      }
    }
    // TODO: do not depend on ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current, routeStreams, place, world, state.type, flyToBounds]);

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
      <HoverStateOverlay />
      {state.type === "fog" ? (
        <Fog state={state} />
      ) : (
        <>
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

            <OverlayDebugSurfaces world={world} />
            <OverlayDebugRoads world={world} />
            <OverlayHeatmap world={world} />
          </LayersControl>

          <RoutePosition streams={routeStreams} />
          <Markers state={state} streams={routeStreams} />
        </>
      )}
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
    [mapRef, prefersReducedMotion],
  );
}
