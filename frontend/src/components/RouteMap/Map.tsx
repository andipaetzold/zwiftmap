import { Icon, Map as MapType } from "leaflet";
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
import { useLocationState } from "../../services/location-state";
import { DistanceStream, LatLngStream } from "../../types";
import { getBounds } from "../../util/bounds";
import styles from "./index.module.scss";
import { OverlayNone } from "./overlays/OverlayNone";
import { OverlaySegments } from "./overlays/OverlaySegments";
import { OverlaySurfaces } from "./overlays/OverlaySurfaces";
import { PreviewRoute } from "./PreviewRoute";
import { RoadLayer } from "./RoadLayer";
import { RoutePosition } from "./RoutePosition";
import { Routing } from "./Routing";
import { SurfaceDebugLayer } from "./SurfaceDebugLayer";
import { WorldImage } from "./WorldImage";

// @ts-expect-error
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface Props {
  world: World;
  routeStreams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function Map({ world, routeStreams }: Props) {
  const state = useLocationState();
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

  const doHardZoom = useRef<boolean>(true);
  useEffect(() => {
    if (!map) {
      return;
    }

    const worldConfig = worldConfigs[world.slug];

    map.invalidateSize();

    if (routeStreams) {
      const bounds = getBounds(routeStreams.latlng);

      if (doHardZoom.current || prefersReducedMotion) {
        map.fitBounds(bounds, { animate: false });
      } else {
        map.flyToBounds(bounds);
      }
    } else {
      if (doHardZoom.current || prefersReducedMotion) {
        map.fitBounds(worldConfig.initialBounds, { animate: false });
      } else {
        map.flyToBounds(worldConfig.initialBounds);
      }
    }

    doHardZoom.current = false;
  }, [map, routeStreams, world, prefersReducedMotion]);

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
            <OverlayNone />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Segments"
          checked={overlay === "segments"}
        >
          <LayerGroup eventHandlers={{ add: () => setOverlay("segments") }}>
            <OverlaySegments />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Surfaces"
          checked={overlay === "surfaces"}
        >
          <LayerGroup eventHandlers={{ add: () => setOverlay("surfaces") }}>
            <OverlaySurfaces />
          </LayerGroup>
        </LayersControl.BaseLayer>

        <SurfaceDebugLayer world={world} />
        <RoadLayer world={world} />
      </LayersControl>

      <RoutePosition streams={routeStreams} />
      {state.type === "routing" && <Routing state={state} />}
    </MapContainer>
  );
}
