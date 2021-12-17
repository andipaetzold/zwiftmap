import { LatLngBounds, LatLngTuple, Map as MapType } from "leaflet";
import { useEffect, useRef, useState } from "react";
import {
  CircleMarker,
  ImageOverlay,
  LayerGroup,
  LayersControl,
  MapContainer,
  Pane,
  Polygon,
  Polyline,
} from "react-leaflet";
import { SegmentType, World } from "zwift-data";
import { ENVIRONMENT } from "../../config";
import { COLORS, SURFACE_CONSTANTS } from "../../constants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useSettings } from "../../hooks/useSettings";
import { worldConfigs } from "../../worldConfigs";
import styles from "./index.module.scss";

const Z_INDEX = {
  previewRoute: 505,
  route: 506,
  segments: 507,
  routeEnd: 508,
  routeStart: 508,
};

interface Props {
  world: World;
  hoverPoint?: LatLngTuple;
  routeLatLngStream?: LatLngTuple[];
  previewRouteLatLngStream?: LatLngTuple[];
  segments?: { latlng: LatLngTuple[]; type: SegmentType }[];
}

export function Map({
  world,
  hoverPoint,
  previewRouteLatLngStream,
  routeLatLngStream,
  segments = [],
}: Props) {
  const [settings, setSettings] = useSettings();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [map, setMap] = useState<MapType | undefined>();
  useEffect(() => {
    map?.zoomControl.setPosition("topright");
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.invalidateSize();
    map.setMaxBounds(world.bounds);

    const minZoom = map.getBoundsZoom(world.bounds, false);
    map.setMinZoom(minZoom);
  }, [map, world, routeLatLngStream]);

  const doHardZoom = useRef<boolean>(true);
  useEffect(() => {
    const worldConfig = worldConfigs[world.slug];
    if (!map) {
      return;
    }

    map.invalidateSize();

    if (routeLatLngStream) {
      const bounds = routeLatLngStream.reduce(
        (bounds, coord) => bounds.extend(coord),
        new LatLngBounds(routeLatLngStream[0], routeLatLngStream[0])
      );

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
  }, [map, routeLatLngStream, world, prefersReducedMotion]);

  const worldConfig = worldConfigs[world.slug];

  return (
    <MapContainer
      whenCreated={(map) => setMap(map)}
      bounds={world.bounds}
      style={{ backgroundColor: worldConfig.backgroundColor }}
      zoomSnap={0.5}
      maxZoom={19}
      className={styles.MapContainer}
    >
      <ImageOverlay
        url={worldConfig.image}
        bounds={world.bounds}
        attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
      />

      {previewRouteLatLngStream && (
        <Pane name="preview-route" style={{ zIndex: Z_INDEX.previewRoute }}>
          <Polyline
            positions={previewRouteLatLngStream}
            pathOptions={{ color: COLORS.previewRoute, weight: 5 }}
            interactive={false}
          />
        </Pane>
      )}

      <LayersControl position="topright">
        <LayersControl.BaseLayer
          name="None"
          checked={settings.overlay === "none"}
        >
          <LayerGroup
            eventHandlers={{
              add: () => setSettings({ ...settings, overlay: "none" }),
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Segments"
          checked={settings.overlay === "segments"}
        >
          <LayerGroup
            eventHandlers={{
              add: () => setSettings({ ...settings, overlay: "segments" }),
            }}
          >
            <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
              {segments
                .filter((s) => ["sprint", "climb"].includes(s.type))
                .map((s, segmentIndex) => (
                  <Polyline
                    key={segmentIndex}
                    positions={s.latlng}
                    pathOptions={{
                      color:
                        s.type === "sprint"
                          ? COLORS.sprintSegment
                          : COLORS.komSegment,
                      weight: 8,
                    }}
                    interactive={false}
                  />
                ))}
            </Pane>
          </LayerGroup>
        </LayersControl.BaseLayer>

        {ENVIRONMENT === "development" && (
          <LayersControl.Overlay name="Surfaces">
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

      {routeLatLngStream && (
        <>
          <Pane name="route" style={{ zIndex: Z_INDEX.route }}>
            <Polyline
              positions={routeLatLngStream}
              pathOptions={{ color: COLORS.route, weight: 5 }}
              interactive={false}
            />
          </Pane>
          <Pane name="route-start" style={{ zIndex: Z_INDEX.routeStart }}>
            <CircleMarker
              center={routeLatLngStream[0]}
              radius={5}
              weight={2}
              pathOptions={{
                color: "white",
                fillColor: "green",
                fillOpacity: 1,
              }}
              interactive={false}
            />
          </Pane>
          <Pane name="route-end" style={{ zIndex: Z_INDEX.routeEnd }}>
            <CircleMarker
              center={routeLatLngStream[routeLatLngStream.length - 1]}
              radius={5}
              weight={2}
              pathOptions={{
                color: "white",
                fillColor: "red",
                fillOpacity: 1,
              }}
              interactive={false}
            />
          </Pane>
        </>
      )}

      {hoverPoint && (
        <Pane name="mouse-position" style={{ zIndex: 508 }}>
          <CircleMarker
            center={hoverPoint}
            radius={5}
            weight={2}
            pathOptions={{
              color: "white",
              fillColor: "black",
              fillOpacity: 1,
            }}
            interactive={false}
          />
        </Pane>
      )}
    </MapContainer>
  );
}
