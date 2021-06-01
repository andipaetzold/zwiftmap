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
import { Route } from "zwift-data";
import { useIsLoggedInStrava } from "../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../hooks/useLocationState";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import {
  getStravaSegmentStream,
  getStravaSegmentStreams,
} from "../../services/StravaSegmentRepository";
import { LocationState, LocationStateRoute } from "../../types";
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
    async (state: LocationState) => {
      if (state.type !== "route") {
        return [];
      }
      const stravaSegments = await Promise.all(
        state.segments.map((s) =>
          getStravaSegmentStream(s.slug, "segments", "latlng")
        )
      );
      return state.segments.map((s, i) => ({
        ...s,
        stravaData: stravaSegments[i],
      }));
    },
    [locationState]
  );

  const [map, setMap] = useState<Map | undefined>();
  useEffect(() => {
    map?.zoomControl.setPosition("topright");
  }, [map]);

  const { result: routeStravaSegment } = useAsync(
    async (type: string, route?: Route) => {
      if (type !== "route") {
        return;
      }

      return await getStravaSegmentStreams(route!.slug, "routes", [
        "distance",
        "latlng",
      ]);
    },
    [locationState.type, (locationState as LocationStateRoute).route]
  );

  const isLoggedInStrava = useIsLoggedInStrava();
  const { result: stravaActivity } = useAsync(
    async (loggedIn: boolean, state: LocationState) => {
      if (!loggedIn || state.type !== "strava-activity") {
        return;
      }
      return await getStravaActivity(state.stravaActivityId);
    },
    [isLoggedInStrava, locationState]
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
    if (!map) {
      return;
    }

    const worldConfig = worldConfigs[locationState.world.slug];

    map.invalidateSize();
    map.setMaxBounds(worldConfig.imageBounds);

    const minZoom = map.getBoundsZoom(worldConfig.imageBounds, false);
    map.setMinZoom(minZoom);

    if (locationState.type !== "route") {
      map.fitBounds(worldConfig.initialBounds);
    }
  }, [map, locationState.world, locationState.type]);

  const pointCoordinates = useMemo<LatLngExpression | undefined>(() => {
    if (!routeStravaSegment || !mouseHoverDistance) {
      return;
    }

    const pointIndex = routeStravaSegment.distance.findIndex(
      (d) => d > mouseHoverDistance * 1_000
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
          <Pane name="preview-route" style={{ zIndex: 506 }}>
            <Polyline
              positions={previewRouteStravaSegment.latlng}
              pathOptions={{ color: "#D3D3D3", weight: 5 }}
            />
          </Pane>
        )}

        {routeStravaSegment && (
          <Pane name="route" style={{ zIndex: 504 }}>
            <Polyline
              positions={routeStravaSegment.latlng}
              pathOptions={{ color: "#fc6719", weight: 5 }}
            />
          </Pane>
        )}

        {stravaActivity && (
          <Pane name="strava-activity" style={{ zIndex: 504 }}>
            <Polyline
              positions={stravaActivity.streams.latlng}
              pathOptions={{ color: "#fc6719", weight: 5 }}
            />
          </Pane>
        )}

        {stravaSegmentsToShow && (
          <Pane name="segments" style={{ zIndex: 505 }}>
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
          <Pane name="mouse-position" style={{ zIndex: 507 }}>
            <Circle
              center={pointCoordinates}
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
    </div>
  );
}
