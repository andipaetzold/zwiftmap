import { LatLngBounds, Map as MapType } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  ImageOverlay,
  MapContainer,
  Pane,
  Polyline,
} from "react-leaflet";
import { worlds } from "zwift-data";
import styles from "./index.module.scss";
import { worldConfigs } from "../../worldConfig";
import { useShare } from "../../hooks/useShare";
import { getWorld } from "../../util/getWorld";
import logo from "./logo.png";

const DEFAULT_WORLD = worlds.find((w) => w.slug === "watopia")!;

const Z_INDEX = {
  previewRoute: 505,
  segments: 506,
  route: 507,
  routeEnd: 508,
  routeStart: 509,
};

export function Map() {
  const [map, setMap] = useState<MapType | undefined>();
  const share = useShare();
  const routeLatLngStream = share?.streams.latlng.data;
  const world = share ? getWorld(share?.activity.start_latlng)! : DEFAULT_WORLD;
  const worldConfig = worldConfigs[world.slug];

  useEffect(() => {
    if (!map || !routeLatLngStream) {
      return;
    }

    const bounds = routeLatLngStream.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LatLngBounds(routeLatLngStream[0], routeLatLngStream[0])
    );

    map.fitBounds(bounds, {
      animate: false,
    });
  }, [map, routeLatLngStream, worldConfig]);

  return (
    <>
      <img src={logo} alt="" className={styles.Logo} width={128} height={128} />

      <MapContainer
        key={world.slug}
        whenCreated={(map) => setMap(map)}
        bounds={world.bounds}
        style={{ backgroundColor: worldConfig.backgroundColor }}
        className={styles.MapContainer}
        zoomControl={false}
        attributionControl={false}
        touchZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        dragging={false}
        trackResize={false}
        zoomSnap={0.1}
        maxZoom={19}
      >
        <ImageOverlay url={worldConfig.image} bounds={world.bounds} />

        {routeLatLngStream && (
          <>
            <Pane name="route" style={{ zIndex: 504 }}>
              <Polyline
                positions={routeLatLngStream}
                pathOptions={{ color: "#fc6719", weight: 10 }}
              />
            </Pane>
            <Pane name="route-start" style={{ zIndex: Z_INDEX.routeStart }}>
              <CircleMarker
                center={routeLatLngStream[0]}
                radius={10}
                weight={4}
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
                radius={10}
                weight={4}
                pathOptions={{
                  color: "white",
                  fillColor: "red",
                  fillOpacity: 1,
                }}
              />
            </Pane>
          </>
        )}
      </MapContainer>
    </>
  );
}
