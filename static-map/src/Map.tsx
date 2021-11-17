import { Map as MapType } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { ImageOverlay, MapContainer } from "react-leaflet";
import { worlds } from "zwift-data";
import styles from "./Map.module.scss";
import { worldConfigs } from "./worldConfig";

const WORLD_SLUG = "watopia";
const world = worlds.find((w) => w.slug === WORLD_SLUG)!;
const worldConfig = worldConfigs[WORLD_SLUG];

export function Map() {
  const [, setMap] = useState<MapType | undefined>();

  return (
    <MapContainer
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
    >
      <ImageOverlay url={worldConfig.image} bounds={world.bounds} />
    </MapContainer>
  );
}
