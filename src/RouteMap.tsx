import { LatLngBounds, LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";
import {
  Circle,
  ImageOverlay,
  LayersControl,
  MapContainer,
  Pane,
  Polyline,
} from "react-leaflet";
import { segments, worlds } from "./data";
import { RouteSelection } from "./RouteSelector";
import { getStravaSegment } from "./StravaSegmentRepository";
import { Route, WorldSlug } from "./types";
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

  const { result: stravaSegmentsInWorld } = useAsync(
    async (w: WorldSlug) => {
      const segmentsInWorld = segments
        .filter((s) => s.sport === "cycling")
        .filter((s) => s.world === w)
        .filter((s) => s.stravaSegmentId !== undefined);

      const stravaSegments = await Promise.all(
        segmentsInWorld.map((s) => getStravaSegment(s.slug))
      );
      return segmentsInWorld.map((s, i) => ({
        ...s,
        stravaData: stravaSegments[i],
      }));
    },
    [world]
  );

  const [map, setMap] = useState<Map | undefined>();
  useEffect(() => {
    map?.zoomControl.setPosition("topright");
  }, [map]);

  const { result: routeStravaSegment } = useAsync(
    async (r?: Route) => {
      if (r === undefined) {
        return;
      }

      return await getStravaSegment(r.slug);
    },
    [routeSelection.route]
  );

  useEffect(() => {
    if (!map || !routeStravaSegment) {
      return;
    }

    const bounds = routeStravaSegment.latlng.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LatLngBounds(
        routeStravaSegment.latlng[0],
        routeStravaSegment.latlng[0]
      )
    );

    map.invalidateSize();
    map.fitBounds(bounds);
  }, [map, routeStravaSegment, worldConfig]);

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
    if (!routeStravaSegment || !mouseHoverDistance) {
      return;
    }

    const pointIndex = routeStravaSegment.distance.findIndex(
      (d) => d > mouseHoverDistance
    );
    if (!pointIndex) {
      return;
    }
    return routeStravaSegment.latlng[pointIndex];
  }, [routeStravaSegment, mouseHoverDistance]);

  return (
    <MapContainer
      key={routeSelection.world}
      whenCreated={(map) => setMap(map)}
      bounds={worldConfig.imageBounds}
      style={{ backgroundColor: worldConfig.backgroundColor }}
      maxZoom={19}
    >
      <ImageOverlay
        url={worldConfig.image}
        bounds={worldConfig.imageBounds}
        attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
      />
      <Pane name="route">
        {routeStravaSegment && (
          <Polyline
            positions={routeStravaSegment.latlng}
            pathOptions={{ color: "#fc6719", weight: 5 }}
          />
        )}
      </Pane>
      <Pane name="segments">
        {stravaSegmentsInWorld?.map((s) => (
          <Polyline
            key={s.slug}
            positions={s.stravaData.latlng}
            pathOptions={{ color: "green", weight: 5 }}
          />
        ))}
      </Pane>
      <Pane name="mouse-position">
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
      </Pane>
    </MapContainer>
  );
}
