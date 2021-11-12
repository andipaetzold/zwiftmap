import { LatLngBounds, LatLngTuple, Map as MapType } from "leaflet";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  ImageOverlay,
  MapContainer,
  Pane,
  Polyline,
} from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../worldConfig";
import styles from "./index.module.css";

const Z_INDEX = {
  previewRoute: 505,
  segments: 506,
  route: 507,
  routeEnd: 508,
  routeStart: 509,
};

interface Props {
  world: World;
  hoverPoint?: LatLngTuple;
  routeLatLngStream?: LatLngTuple[];
  previewRouteLatLngStream?: LatLngTuple[];
  segmentLatLngStreams?: LatLngTuple[][];
}

export function Map({
  world,
  hoverPoint,
  previewRouteLatLngStream,
  routeLatLngStream,
  segmentLatLngStreams,
}: Props) {
  const worldConfig = worldConfigs[world.slug];

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
  }, [map, worldConfig, world, routeLatLngStream]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.invalidateSize();
    if (!routeLatLngStream) {
      map.fitBounds(worldConfig.initialBounds);
      return;
    }

    const bounds = routeLatLngStream.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LatLngBounds(routeLatLngStream[0], routeLatLngStream[0])
    );

    map.fitBounds(bounds);
  }, [map, routeLatLngStream, worldConfig]);

  return (
    <MapContainer
      whenCreated={(map) => setMap(map)}
      bounds={world.bounds}
      style={{ backgroundColor: worldConfig.backgroundColor }}
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
            pathOptions={{ color: "#D3D3D3", weight: 5 }}
          />
        </Pane>
      )}

      {routeLatLngStream && (
        <>
          <Pane name="route" style={{ zIndex: 504 }}>
            <Polyline
              positions={routeLatLngStream}
              pathOptions={{ color: "#fc6719", weight: 5 }}
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
            />
          </Pane>
        </>
      )}

      {segmentLatLngStreams && (
        <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
          {segmentLatLngStreams.map((s, segmentIndex) => (
            <Polyline
              key={segmentIndex}
              positions={s}
              pathOptions={{ color: "#64ac39", weight: 8 }}
            />
          ))}
        </Pane>
      )}

      {hoverPoint && (
        <Pane name="mouse-position" style={{ zIndex: 508 }}>
          <CircleMarker
            center={hoverPoint}
            radius={5}
            weight={0}
            pathOptions={{
              color: "black",
              fillColor: "black",
              fillOpacity: 1,
            }}
          />
        </Pane>
      )}
    </MapContainer>
  );
}
