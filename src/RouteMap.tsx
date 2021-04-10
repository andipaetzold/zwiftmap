import along from "@turf/along";
import { lineString } from "@turf/helpers";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";
import { Circle, ImageOverlay, MapContainer, Polyline } from "react-leaflet";
import { RouteSelection } from "./RouteSelector";
import { getSegment } from "./SegmentRepository";
import { Route } from "./types";
import { worldConfigs } from "./worldConfig";
import { LatLngBounds, LatLngExpression, Map } from "leaflet";
import { flipLatLng } from "./util";

interface Props {
  routeSelection: RouteSelection;
  mouseHoverDistance: number | undefined;
}

export default function RouteMap({
  routeSelection,
  mouseHoverDistance,
}: Props) {
  const world = routeSelection.world;
  const worldConfig = worldConfigs[world];
  const bounds = useMemo(() => new LatLngBounds(worldConfig.bounds), [
    worldConfig,
  ]);

  const [map, setMap] = useState<Map | undefined>();

  const { result: segment } = useAsync(
    async (r?: Route) => {
      if (r === undefined) {
        return;
      }

      return await getSegment(r.slug);
    },
    [routeSelection.route]
  );

  useEffect(() => {
    if (!map || !segment) {
      return;
    }

    const bounds = segment.latlng.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LatLngBounds(segment.latlng[0], segment.latlng[0])
    );

    map.invalidateSize();
    map.fitBounds(bounds);
  }, [map, segment]);

  useEffect(() => {
    if (!map || !routeSelection) {
      return;
    }

    const world = routeSelection.world;
    const worldConfig = worldConfigs[world];
    const bounds = new LatLngBounds(worldConfig.bounds);

    map.invalidateSize();
    map.setMaxBounds(bounds);

    const minZoom = map.getBoundsZoom(bounds, false);
    map.setMinZoom(minZoom);

    if (!routeSelection.route) {
      map.setZoom(minZoom, { animate: false });
    }
  }, [map, routeSelection]);

  const pointCoordinates = useMemo<LatLngExpression | undefined>(() => {
    if (!segment || !mouseHoverDistance) {
      return;
    }

    const line = lineString(segment.latlng.map(flipLatLng));
    const point = along(line, mouseHoverDistance, { units: "kilometers" });
    return [point.geometry.coordinates[1], point.geometry.coordinates[0]];
  }, [segment, mouseHoverDistance]);

  return (
    <MapContainer
      key={routeSelection.world}
      whenCreated={(map) => setMap(map)}
      bounds={bounds}
      style={{ backgroundColor: worldConfig.backgroundColor }}
    >
      <ImageOverlay
        url={worldConfig.image}
        bounds={bounds}
        attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
      />
      {segment && (
        <Polyline
          positions={segment.latlng}
          pathOptions={{ color: "#fc6719", weight: 4 }}
        />
      )}
      {pointCoordinates && (
        <Circle
          center={pointCoordinates}
          radius={5}
          pathOptions={{
            color: "white",
            fillColor: "white",
            fillOpacity: 1,
          }}
        />
      )}
    </MapContainer>
  );
}
