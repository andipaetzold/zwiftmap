import { lineString } from "@turf/helpers";
import mapboxgl, { LinePaint, LngLatBounds, Map } from "mapbox-gl";
import React, { useEffect, useMemo, useState } from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
import { FitBounds } from "react-mapbox-gl/lib/map";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { MAPBOX_STYLE_WATOPIA, MAPBOX_TOKEN } from "./constants";
import styles from "./RouteMap.module.css";
import { Segment } from "./types";
import { flipLatLng } from "./util";

// @ts-ignore
mapboxgl.workerClass = mapboxWorker;

const MAX_BOUNDS: FitBounds = [
  [166.8778, -11.70256],
  [167.0321, -11.6259],
];
const MIN_ZOOM = 9;
const MAX_ZOOM = 18;

const Mapbox = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
});

const LINE_PAINT: LinePaint = {
  "line-color": "#fc6719",
  "line-width": 4,
};

interface Props {
  segment: Segment | undefined;
}

export default function RouteMap({ segment }: Props) {
  const [map, setMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    if (!map || !segment) {
      return;
    }

    const coordinates: [number, number][] = segment.latlng.map(flipLatLng);
    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinates[0], coordinates[0])
    );

    map.resize().fitBounds(bounds, {
      padding: 20,
    });
  }, [map, segment]);

  const geoJSONData = useMemo(() => {
    if (!segment) {
      return;
    }
    return lineString(segment.latlng.map(flipLatLng));
  }, [segment]);

  return (
    <Mapbox
      // eslint-disable-next-line react/style-prop-object
      style={MAPBOX_STYLE_WATOPIA}
      className={styles.Container}
      maxBounds={MAX_BOUNDS}
      onStyleLoad={(map) => setMap(map)}
    >
      <ZoomControl />
      <ScaleControl />
      {geoJSONData && (
        <GeoJSONLayer data={geoJSONData} linePaint={LINE_PAINT} />
      )}
    </Mapbox>
  );
}
