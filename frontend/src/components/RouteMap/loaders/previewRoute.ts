import * as Sentry from "@sentry/react";
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
        const streams = await getStravaSegmentStreams(data.route, "routes", [
          "latlng",
        ]);
        return streams.latlng;
      }
      case HoverStateType.PreviewEvent: {
        const streams = await getEventStreams(data.event, ["latlng"]);
        return streams?.latlng;
      }
      case HoverStateType.PreviewSegment: {
        const streams = await getStravaSegmentStreams(
          data.segment,
          "segments",
          ["latlng"]
        );
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
