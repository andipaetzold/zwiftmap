import { LatLngTuple } from "leaflet";
import { getStravaSegmentStreams } from "../../../services/StravaSegmentRepository";
import { HoverData } from "../../../types";
import * as Sentry from "@sentry/react";

export async function loadPreviewRoute(
  data: HoverData | undefined
): Promise<LatLngTuple[] | undefined> {
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
