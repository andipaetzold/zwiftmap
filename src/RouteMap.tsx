import { LatLngBounds, LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";
import { Circle, ImageOverlay, MapContainer, Polyline } from "react-leaflet";
import { RouteSelection } from "./RouteSelector";
import { getSegment } from "./SegmentRepository";
import { Route } from "./types";
import { worldConfigs } from "./worldConfig";

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
  const bounds = useMemo(() => new LatLngBounds(worldConfig.imageBounds), [
    worldConfig,
  ]);

  const [map, setMap] = useState<Map | undefined>();
  useEffect(() => {
    map?.zoomControl.setPosition("topright");
  }, [map]);

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
  }, [map, segment, worldConfig]);

  useEffect(() => {
    if (!map || !routeSelection) {
      return;
    }

    const world = routeSelection.world;
    const worldConfig = worldConfigs[world];

    map.invalidateSize();
    map.setMaxBounds(worldConfig.imageBounds);

    const minZoom = map.getBoundsZoom(worldConfig.imageBounds, false);
    map.setMinZoom(minZoom);

    if (!routeSelection.route) {
      map.fitBounds(worldConfig.routeBounds);
    }
  }, [map, routeSelection]);

  const pointCoordinates = useMemo<LatLngExpression | undefined>(() => {
    if (!segment || !mouseHoverDistance) {
      return;
    }

    const pointIndex = segment.distance.findIndex(
      (d) => d > mouseHoverDistance
    );
    if (!pointIndex) {
      return;
    }
    return segment.latlng[pointIndex];
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
          radius={10}
          pathOptions={{
            color: "black",
            fillColor: "black",
            fillOpacity: 1,
          }}
        />
      )}
    </MapContainer>
  );
}
