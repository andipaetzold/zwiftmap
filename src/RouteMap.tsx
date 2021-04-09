import along from "@turf/along";
import { lineString } from "@turf/helpers";
import mapboxgl, { LinePaint, LngLatBounds, Map } from "mapbox-gl";
import React, { useEffect, useMemo, useState } from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { MAPBOX_TOKEN } from "./constants";
import styles from "./RouteMap.module.css";
import { Segment, World } from "./types";
import { flipLatLng } from "./util";
import { worldConfigs } from "./worldConfig";

// @ts-ignore
mapboxgl.workerClass = mapboxWorker;

const Mapbox = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  dragRotate: false,
  pitchWithRotate: false,
  touchZoomRotate: false,
  minZoom: 0, // limited by max bounds
  maxZoom: 18,
});

const LINE_PAINT: LinePaint = {
  "line-color": "#fc6719",
  "line-width": 4,
};

interface Props {
  segment: Segment | undefined;
  mouseHoverDistance: number | undefined;
  world: World;
}

export default function RouteMap({
  segment,
  mouseHoverDistance,
  world,
}: Props) {
  const worldConfig = worldConfigs[world];
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

    map.fitBounds(bounds, {
      padding: 20,
    });
  }, [map, segment]);

  useEffect(() => {
    if (!map) {
      return;
    }
    map.resize().setZoom(0);
  }, [map, world]);

  const lineGeoJSON = useMemo(() => {
    if (!segment) {
      return;
    }
    return lineString(segment.latlng.map(flipLatLng));
  }, [segment]);

  const pointGeoJSON = useMemo(() => {
    if (!lineGeoJSON || !mouseHoverDistance) {
      return;
    }

    return along(lineGeoJSON, mouseHoverDistance, { units: "kilometers" });
  }, [lineGeoJSON, mouseHoverDistance]);

  return (
    <Mapbox
      // eslint-disable-next-line react/style-prop-object
      style={worldConfig.style}
      className={styles.Container}
      maxBounds={worldConfig.bounds}
      onStyleLoad={(map) => setMap(map)}
    >
      <ZoomControl />
      <ScaleControl />
      {lineGeoJSON && (
        <GeoJSONLayer data={lineGeoJSON} linePaint={LINE_PAINT} />
      )}
      {pointGeoJSON && (
        <GeoJSONLayer
          data={pointGeoJSON}
          circlePaint={{
            "circle-radius": 7.5,
            "circle-color": "white",
            "circle-stroke-width": 1,
          }}
        />
      )}
    </Mapbox>
  );
}
