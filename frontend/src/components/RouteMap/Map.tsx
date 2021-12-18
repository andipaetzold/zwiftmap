import { LatLngTuple, Map as MapType } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Polygon,
  ZoomControl
} from "react-leaflet";
import { SegmentType, World } from "zwift-data";
import { ENVIRONMENT } from "../../config";
import { SURFACE_CONSTANTS } from "../../constants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useSettings } from "../../hooks/useSettings";
import { Overlay } from "../../types";
import { getBounds } from "../../util/bounds";
import { worldConfigs } from "../../constants/worldConfigs";
import styles from "./index.module.scss";
import { OverlayNone } from "./overlays/OverlayNone";
import { OverlaySegments } from "./overlays/OverlaySegments";
import { PreviewRoute } from "./PreviewRoute";
import { RoutePosition } from "./RoutePosition";
import { WorldImage } from "./WorldImage";

interface Props {
  world: World;
  routeStreams?: {
    latlng: LatLngTuple[];
    distance: number[];
  };
  previewRouteLatLngStream?: LatLngTuple[];
  segments?: { latlng: LatLngTuple[]; type: SegmentType }[];
  mouseHoverDistance?: number;
}

export function Map({
  world,
  previewRouteLatLngStream,
  routeStreams,
  mouseHoverDistance,
  segments = [],
}: Props) {
  const [settings, setSettings] = useSettings();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [map, setMap] = useState<MapType | undefined>();

  const handleOverlayChange = (overlay: Overlay) => {
    setSettings({ ...settings, overlay });
  };

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
      <PreviewRoute latLngStream={previewRouteLatLngStream} />

      <LayersControl position="topright">
        <LayersControl.BaseLayer
          name="None"
          checked={settings.overlay === "none"}
        >
          <LayerGroup
            eventHandlers={{ add: () => handleOverlayChange("none") }}
          >
            <OverlayNone />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Segments"
          checked={settings.overlay === "segments"}
        >
          <LayerGroup
            eventHandlers={{ add: () => handleOverlayChange("segments") }}
          >
            <OverlaySegments />
          </LayerGroup>
        </LayersControl.BaseLayer>

        {ENVIRONMENT === "development" && (
          <LayersControl.Overlay name="Surface Polygons">
            <LayerGroup>
              {worldConfig.surfaces.map((s, surfaceIndex) => (
                <Polygon
                  key={surfaceIndex}
                  interactive={false}
                  pathOptions={{ color: SURFACE_CONSTANTS[s.type].color }}
                  positions={s.polygon}
                />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>

      <RoutePosition
        hoverDistance={mouseHoverDistance}
        streams={routeStreams}
      />
    </MapContainer>
  );
}
