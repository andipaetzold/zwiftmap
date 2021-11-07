import { LatLngTuple, Map as MapType } from "leaflet";
import {
  Circle,
  ImageOverlay,
  MapContainer,
  Pane,
  Polyline,
} from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../worldConfig";
import styles from "./index.module.css";

interface Props {
  world: World;

  onMapChange: (map: MapType) => void;

  hoverPoint?: LatLngTuple;
  routeLatLngStream?: LatLngTuple[];
  previewRouteLatLngStream?: LatLngTuple[];
  segmentLatLngStreams?: LatLngTuple[][];
}

export function Map({
  world,
  onMapChange,
  hoverPoint,
  previewRouteLatLngStream,
  routeLatLngStream,
  segmentLatLngStreams,
}: Props) {
  const worldConfig = worldConfigs[world.slug];

  return (
    <MapContainer
      whenCreated={(map) => onMapChange(map)}
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
        <Pane name="preview-route" style={{ zIndex: 506 }}>
          <Polyline
            positions={previewRouteLatLngStream}
            pathOptions={{ color: "#D3D3D3", weight: 5 }}
          />
        </Pane>
      )}

      {routeLatLngStream && (
        <Pane name="route" style={{ zIndex: 504 }}>
          <Polyline
            positions={routeLatLngStream}
            pathOptions={{ color: "#fc6719", weight: 5 }}
          />
        </Pane>
      )}

      {segmentLatLngStreams && (
        <Pane name="segments" style={{ zIndex: 505 }}>
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
        <Pane name="mouse-position" style={{ zIndex: 507 }}>
          <Circle
            center={hoverPoint}
            radius={15}
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
