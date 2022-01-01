import * as Sentry from "@sentry/react";
import { fetchEvent, getEventStreams } from "../../../services/events";
import { LocationState } from "../../../services/location-state";
import { getStravaActivity } from "../../../services/StravaActivityRepository";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { getShare } from "../../../services/zwiftMapApi";
import { DistanceStream, LatLngStream } from "../../../types";

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
          ["distance", "latlng"]
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
