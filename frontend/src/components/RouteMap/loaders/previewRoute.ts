import * as Sentry from "@sentry/react";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { HoverData, LatLngStream } from "../../../types";
import { isSaveDataMode } from "../../../util/saveData";

export async function loadPreviewRoute(
  data: HoverData | undefined
): Promise<LatLngStream | undefined> {
  if (isSaveDataMode()) {
    return;
  }

  try {
    if (data === undefined) {
      return;
    }

    switch (data.type) {
      case "route":
        const streams = await getStravaSegmentStreams(data.route, "routes", [
          "latlng",
        ]);
        return streams.latlng;
      case "latlng":
        return data.latlng;
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}
