import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import { useIsLoggedInStrava } from "../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../hooks/useLocationState";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import {
  getStravaSegmentStream,
  getStravaSegmentStreams,
} from "../../services/StravaSegmentRepository";
import { LocationState, LocationStateRoute } from "../../types";
import styles from "./index.module.css";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute?: string;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState] = useLocationState();
  const world = locationState.world;

  const { result: segmentsLatLngStreams } = useAsync(
    async (state: LocationState) => {
      if (state.type !== "route") {
        return [];
      }
      return await Promise.all(
        state.segments.map((s) =>
          getStravaSegmentStream(s.slug, "segments", "latlng")
        )
      );
    },
    [locationState]
  );

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

  const pointCoordinates = useMemo<LatLngTuple | undefined>(() => {
    if ((!routeStravaSegment && !stravaActivity) || !mouseHoverDistance) {
      return;
    }

    const distanceStream =
      routeStravaSegment?.distance ??
      (stravaActivity?.streams.distance as number[]);
    const latLngStream =
      routeStravaSegment?.latlng ??
      (stravaActivity?.streams.latlng as [number, number][]);

    const pointIndex = distanceStream.findIndex(
      (d) => d > mouseHoverDistance * 1_000
    );
    if (!pointIndex) {
      return;
    }
    return latLngStream[pointIndex];
  }, [routeStravaSegment, stravaActivity, mouseHoverDistance]);

  return (
    <div className={styles.Container}>
      <WorldSelect />
      <Map
        key={world.slug}
        world={world}
        hoverPoint={pointCoordinates}
        previewRouteLatLngStream={previewRouteStravaSegment?.latlng}
        routeLatLngStream={
          routeStravaSegment?.latlng ?? stravaActivity?.streams.latlng
        }
        segmentLatLngStreams={segmentsLatLngStreams}
      />
    </div>
  );
}
