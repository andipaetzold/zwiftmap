import * as Sentry from "@sentry/react";
import turfDistance from "@turf/distance";
import { point as turfPoint } from "@turf/helpers";
import { LatLngTuple } from "leaflet";
import { range } from "lodash";
import { fetchEvent, getEventStreams } from "../../../services/events";
import { LocationState } from "../../../services/location-state";
import { getStravaActivity } from "../../../services/StravaActivityRepository";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { worker } from "../../../services/worker-client";
import { getShare } from "../../../services/zwiftMapApi";
import { DistanceStream, LatLngStream } from "../../../types";
import { dropAltitude } from "../../../util/drop-altitude";

export async function loadRoute(state: LocationState): Promise<
  | {
      latlng: LatLngStream;
      distance: DistanceStream;
    }
  | undefined
> {
  try {
    switch (state.type) {
      case "route": {
        if (!state.route.stravaSegmentId) {
          return;
        }
        const streams = await getStravaSegmentStreams(
          state.route.stravaSegmentId,
          ["distance", "latlng", "altitude"]
        );
        return {
          distance: streams.distance,
          latlng: streams.latlng,
        };
      }

      case "segment": {
        if (!state.segment.stravaSegmentId) {
          return;
        }
        const streams = await getStravaSegmentStreams(
          state.segment.stravaSegmentId,
          ["distance", "latlng"]
        );
        return {
          distance: streams.distance,
          latlng: streams.latlng,
        };
      }

      case "strava-activity": {
        const activity = await getStravaActivity(state.stravaActivityId);
        if (!activity.streams.distance || !activity.streams.latlng) {
          return;
        }

        return {
          distance: activity.streams.distance,
          latlng: activity.streams.latlng,
        };
      }

      case "event": {
        const event = await fetchEvent(state.eventId);
        const streams = await getEventStreams(event, ["latlng", "distance"]);
        if (streams) {
          return streams;
        }
        break;
      }

      case "routing": {
        const nonNullPoints = state.points.filter(
          (p): p is LatLngTuple => p !== null
        );

        if (nonNullPoints.length < 2) {
          return;
        }

        const routeParts = await Promise.all(
          range(0, nonNullPoints.length - 1).map((index) =>
            worker.navigate(
              nonNullPoints[index],
              nonNullPoints[index + 1],
              state.world.slug
            )
          )
        );
        const latlng = routeParts.flat().map(dropAltitude);
        const distance = latlng
          .map((latlng, index, array) =>
            index === 0
              ? 0
              : turfDistance(turfPoint(array[index - 1]), turfPoint(latlng), {
                  units: "meters",
                })
          )
          .reduce(
            (prev, cur, index) =>
              index === 0 ? [0] : [...prev, prev[prev.length - 1] + cur],
            [] as number[]
          );
        return { latlng, distance };
      }

      case "share": {
        const share = await getShare(state.shareId);
        return {
          distance: share.streams.distance.data,
          latlng: share.streams.latlng.data as unknown as [number, number][],
        };
      }
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}
