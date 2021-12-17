import * as Sentry from "@sentry/react";
import { LatLngTuple } from "leaflet";
import { routes } from "zwift-data";
import { fetchEvent } from "../../../services/events";
import { LocationState } from "../../../services/location-state";
import { getStravaActivity } from "../../../services/StravaActivityRepository";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { getShare } from "../../../services/zwiftMapApi";

export async function loadRoute(state: LocationState): Promise<
  | {
      latlng: LatLngTuple[];
      distance: number[];
    }
  | undefined
> {
  try {
    switch (state.type) {
      case "route": {
        if (state.route && state.route.stravaSegmentId) {
          const streams = await getStravaSegmentStreams(
            state.route.slug,
            "routes",
            ["distance", "latlng"]
          );
          return {
            distance: streams.distance,
            latlng: streams.latlng,
          };
        }
        break;
      }

      case "segment": {
        if (state.segment && state.segment.stravaSegmentId) {
          const streams = await getStravaSegmentStreams(
            state.segment.slug,
            "segments",
            ["distance", "latlng"]
          );
          return {
            distance: streams.distance,
            latlng: streams.latlng,
          };
        }
        break;
      }

      case "strava-activity": {
        const activity = await getStravaActivity(state.stravaActivityId);
        return {
          distance: activity.streams.distance,
          latlng: activity.streams.latlng,
        };
      }

      case "event": {
        const event = await fetchEvent(state.eventId);
        const route = routes.find((r) => r.id === event.routeId);

        if (route && route.stravaSegmentId) {
          const segment = await getStravaSegmentStreams(route.slug, "routes", [
            "distance",
            "latlng",
          ]);
          return {
            distance: segment.distance,
            latlng: segment.latlng,
          };
        }
        break;
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
