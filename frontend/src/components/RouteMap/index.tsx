import { LatLngBounds, LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";
import {
  Circle,
  ImageOverlay,
  MapContainer,
  Pane,
  Polyline,
} from "react-leaflet";
import { useLocationState } from "../../hooks/useLocationState";
import {
  getStravaSegmentStream,
  getStravaSegmentStreams,
} from "../../services/StravaSegmentRepository";
import { Route, Segment } from "../../types";
import { worldConfigs } from "../../worldConfig";
import styles from "./index.module.css";
import { WorldSelect } from "./WorldSelect";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute?: string;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState] = useLocationState();
  const world = locationState.world;
  const worldConfig = worldConfigs[world.slug];

  const { result: stravaSegmentsToShow } = useAsync(
    async (fs: Segment[]) => {
      const stravaSegments = await Promise.all(
        fs.map((s) => getStravaSegmentStream(s.slug, "segments", "latlng"))
      );
      return fs.map((s, i) => ({
        ...s,
        stravaData: stravaSegments[i],
      }));
    },
    [locationState.segments]
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

      return await getStravaSegmentStreams(r.slug, "routes", [
        "distance",
        "latlng",
      ]);
    },
    [locationState.route]
  );

  const { result: previewRouteStravaSegment } = useAsync(
    async (r: string | undefined) => {
      if (r === undefined) {
        return;
      }

      return await getStravaSegmentStreams(r, "routes", ["latlng"]);
    },
    [previewRoute]
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
    if (!map || !locationState) {
      return;
    }

    const worldConfig = worldConfigs[locationState.world.slug];

    map.invalidateSize();
    map.setMaxBounds(worldConfig.imageBounds);

    const minZoom = map.getBoundsZoom(worldConfig.imageBounds, false);
    map.setMinZoom(minZoom);

    if (!locationState.route) {
      map.fitBounds(worldConfig.initialBounds);
    }
  }, [map, locationState]);

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
    <div className={styles.Container}>
      <WorldSelect />
      <MapContainer
        key={locationState.world.slug}
        whenCreated={(map) => setMap(map)}
        bounds={worldConfig.imageBounds}
        style={{ backgroundColor: worldConfig.backgroundColor }}
        maxZoom={19}
        className={styles.MapContainer}
      >
        <ImageOverlay
          url={worldConfig.image}
          bounds={worldConfig.imageBounds}
          attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
        />

        {previewRouteStravaSegment && (
          <Pane name="preview-route">
            <Polyline
              positions={previewRouteStravaSegment.latlng}
              pathOptions={{ color: "#D3D3D3", weight: 5 }}
            />
          </Pane>
        )}

        {routeStravaSegment && (
          <Pane name="route">
            <Polyline
              positions={routeStravaSegment.latlng}
              pathOptions={{ color: "#fc6719", weight: 5 }}
            />
          </Pane>
        )}

        {stravaSegmentsToShow && (
          <Pane name="segments">
            {stravaSegmentsToShow?.map((s) => (
              <Polyline
                key={s.slug}
                positions={s.stravaData}
                pathOptions={{ color: "#64ac39", weight: 8 }}
              />
            ))}
          </Pane>
        )}

        {pointCoordinates && (
          <Pane name="mouse-position">
            <Circle
              center={pointCoordinates}
              radius={10}
              pathOptions={{
                color: "black",
                fillColor: "black",
                fillOpacity: 1,
              }}
            />
          </Pane>
        )}
      </MapContainer>
    </div>
  );
}
