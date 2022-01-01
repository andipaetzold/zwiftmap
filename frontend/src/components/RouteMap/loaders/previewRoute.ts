import * as Sentry from "@sentry/react";
import { routes, segments } from "zwift-data";
import { getEventStreams } from "../../../services/events";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { HoverState, HoverStateType, LatLngStream } from "../../../types";
import { isSaveDataMode } from "../../../util/saveData";

export async function loadPreviewRoute(
  data: HoverState | undefined
): Promise<LatLngStream | undefined> {
  if (isSaveDataMode()) {
    return;
  }

  try {
    if (data === undefined) {
      return;
    }

    switch (data.type) {
      case HoverStateType.PreviewRoute: {
        const route = routes.find((r) => r.slug === data.route);
        if (!route?.stravaSegmentId) {
          return;
        }

        const streams = await getStravaSegmentStreams(route.stravaSegmentId, [
          "latlng",
        ]);
        return streams.latlng;
      }
      case HoverStateType.PreviewEvent: {
        const streams = await getEventStreams(data.event, ["latlng"]);
        return streams?.latlng;
      }
      case HoverStateType.PreviewSegment: {
        const segment = segments.find((s) => s.slug === data.segment);
        if (!segment?.stravaSegmentId) {
          return;
        }
        const streams = await getStravaSegmentStreams(segment.stravaSegmentId, [
          "latlng",
        ]);
        return streams.latlng;
      }
      case HoverStateType.PreviewLatLngStream: {
        return data.latLngStream;
      }
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}
