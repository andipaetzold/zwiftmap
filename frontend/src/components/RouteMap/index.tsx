import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route, routes } from "zwift-data";
import {
  DEFAULT_WORLD,
  LocationState,
  LocationStateRoute,
  LocationStateShare,
  LocationStateStravaActivity,
  LocationStateUpcomingEvent,
  useLocationState,
} from "../../services/location-state";
import { fetchEvent } from "../../services/events";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import {
  getStravaSegmentStream,
  getStravaSegmentStreams,
} from "../../services/StravaSegmentRepository";
import styles from "./index.module.css";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";
import { getShare } from "../../services/zwiftMapApi";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute?: string;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();

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

  const { result: routeStreamSet } = useAsync<
    | {
        latlng: LatLngTuple[];
        distance: number[];
      }
    | undefined
  >(
    async (
      type: LocationState["type"],
      route: Route | undefined,
      stravaActivityId: number | undefined,
      eventId: string | undefined,
      shareId: string | undefined
    ) => {
      switch (type) {
        case "route": {
          const segment = await getStravaSegmentStreams(route!.slug, "routes", [
            "distance",
            "latlng",
          ]);
          return {
            distance: segment.distance,
            latlng: segment.latlng,
          };
        }
        case "strava-activity": {
          const activity = await getStravaActivity(stravaActivityId!);
          return {
            distance: activity.streams.distance,
            latlng: activity.streams.latlng,
          };
        }
        case "event": {
          const event = await fetchEvent(eventId!);
          const route = routes.find((r) => r.id === event.routeId);
          if (route) {
            const segment = await getStravaSegmentStreams(
              route!.slug,
              "routes",
              ["distance", "latlng"]
            );
            return {
              distance: segment.distance,
              latlng: segment.latlng,
            };
          }
          break;
        }

        case "share": {
          const share = await getShare(shareId!);
          return {
            distance: share.streams.distance.data,
            latlng: share.streams.latlng.data as unknown as [
              number,
              number
            ][],
          };
        }
      }
    },
    [
      locationState.type,
      (locationState as LocationStateRoute).route,
      (locationState as LocationStateStravaActivity).stravaActivityId,
      (locationState as LocationStateUpcomingEvent).eventId,
      (locationState as LocationStateShare).shareId,
    ]
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
    if (!routeStreamSet || !mouseHoverDistance) {
      return;
    }

    const pointIndex = routeStreamSet.distance.findIndex(
      (d) => d > mouseHoverDistance * 1_000
    );
    if (!pointIndex) {
      return;
    }
    return routeStreamSet.latlng[pointIndex];
  }, [routeStreamSet, mouseHoverDistance]);

  const selectedWorld = locationState.world ?? DEFAULT_WORLD;

  return (
    <div className={styles.Container}>
      <WorldSelect
        world={selectedWorld}
        onWorldChange={(newWorld) => {
          setLocationState({
            world: newWorld,
            query: "",
            type: "default",
          });
        }}
      />
      <Map
        key={selectedWorld.slug}
        world={selectedWorld}
        hoverPoint={pointCoordinates}
        previewRouteLatLngStream={previewRouteStravaSegment?.latlng}
        routeLatLngStream={routeStreamSet?.latlng}
        segmentLatLngStreams={segmentsLatLngStreams}
      />
    </div>
  );
}
