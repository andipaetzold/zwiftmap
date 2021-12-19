import * as Sentry from "@sentry/react";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { HoverState, LatLngStream } from "../../../types";
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
      case "preview-route": {
        const streams = await getStravaSegmentStreams(data.route, "routes", [
          "latlng",
        ]);
        return streams.latlng;
      }
      case "preview-segment": {
        const streams = await getStravaSegmentStreams(
          data.segment,
          "segments",
          ["latlng"]
        );
        return streams.latlng;
      }
      case "preview-latLngStream": {
        return data.latLngStream;
      }
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}
