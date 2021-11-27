import * as Sentry from "@sentry/react";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route, routes, Segment } from "zwift-data";
import { useStore } from "../../hooks/useStore";
import { fetchEvent } from "../../services/events";
import {
  DEFAULT_WORLD,
  LocationState,
  LocationStateRoute,
  LocationStateSegment,
  LocationStateShare,
  LocationStateStravaActivity,
  LocationStateUpcomingEvent,
  useLocationState,
} from "../../services/location-state";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import {
  getStravaSegmentStream,
  getStravaSegmentStreams,
} from "../../services/StravaSegmentRepository";
import { getShare } from "../../services/zwiftMapApi";
import { HoverData } from "../../types";
import styles from "./index.module.css";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

interface Props {
  mouseHoverDistance: number | undefined;
  previewRoute: HoverData;
}

export default function RouteMap({ mouseHoverDistance, previewRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const setQuery = useStore((state) => state.setQuery);

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
    [locationState],
    {
      onError: (e) => Sentry.captureException(e),
    }
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
      segment: Segment | undefined,
      stravaActivityId: number | undefined,
      eventId: string | undefined,
      shareId: string | undefined
    ) => {
      switch (type) {
        case "route": {
          const streams = await getStravaSegmentStreams(route!.slug, "routes", [
            "distance",
            "latlng",
          ]);
          return {
            distance: streams.distance,
            latlng: streams.latlng,
          };
        }
        case "segment": {
          const streams = await getStravaSegmentStreams(segment!.slug, "segments", [
            "distance",
            "latlng",
          ]);
          return {
            distance: streams.distance,
            latlng: streams.latlng,
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
            latlng: share.streams.latlng.data as unknown as [number, number][],
          };
        }
      }
    },
    [
      locationState.type,
      (locationState as LocationStateRoute).route,
      (locationState as LocationStateSegment).segment,
      (locationState as LocationStateStravaActivity).stravaActivityId,
      (locationState as LocationStateUpcomingEvent).eventId,
      (locationState as LocationStateShare).shareId,
    ],
    {
      onError: (e) => Sentry.captureException(e),
    }
  );

  const { result: previewLatLng } = useAsync<LatLngTuple[] | undefined>(
    async (r: HoverData) => {
      if (r === undefined) {
        return;
      }

      switch (r.type) {
        case "route":
          return (await getStravaSegmentStreams(r.route, "routes", ["latlng"]))
            .latlng;
        case "latlng":
          return r.latlng;
      }
    },
    [previewRoute],
    {
      onError: (e) => Sentry.captureException(e),
    }
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
          setQuery("");
          setLocationState({
            world: newWorld,
            type: "default",
          });
        }}
      />
      <Map
        key={selectedWorld.slug}
        world={selectedWorld}
        hoverPoint={pointCoordinates}
        previewRouteLatLngStream={previewLatLng}
        routeLatLngStream={routeStreamSet?.latlng}
        segmentLatLngStreams={segmentsLatLngStreams}
      />
    </div>
  );
}
