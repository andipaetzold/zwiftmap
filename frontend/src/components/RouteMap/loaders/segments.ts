import * as Sentry from "@sentry/react";
import { segments } from "zwift-data";
import { LocationState } from "../../../services/location-state";
import { getStravaSegmentStream } from "../../../services/StravaSegmentRepository";

export async function loadSegments(state: LocationState) {
  try {
    if (state.type !== "route") {
      return [];
    }
    const segmentsOnRoute = state.route.segments
      .map((segmentSlug) => segments.find((s) => s.slug === segmentSlug)!)
      .filter((s) => s.stravaSegmentId !== undefined);

    const streams = await Promise.all(
      segmentsOnRoute.map((s) =>
        getStravaSegmentStream(s.slug, "segments", "latlng")
      )
    );

    return streams.map((stream, streamIndex) => ({
      latlng: stream,
      type: segmentsOnRoute[streamIndex].type,
    }));
  } catch (e) {
    Sentry.captureException(e);
  }
}
