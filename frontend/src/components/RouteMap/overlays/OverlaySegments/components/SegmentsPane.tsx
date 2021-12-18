import * as Sentry from "@sentry/react";
import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { segments, SegmentType } from "zwift-data";
import { getSegmentColor } from "../../../../../constants";
import { getStravaSegmentStream } from "../../../../../services/StravaSegmentRepository";
import { Z_INDEX } from "../../../constants";

const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

interface SegmentsPaneProps {
  segmentSlugs: string[];
}

export function SegmentsPane({ segmentSlugs }: SegmentsPaneProps) {
  const { result: segmentsData } = useAsync(loadSegments, [segmentSlugs]);

  if (!segmentsData) {
    return null;
  }

  return (
    <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
      {segmentsData
        .filter((s) => SEGMENTS_TO_DISPLAY.includes(s.type))
        .map((s, segmentIndex) => (
          <Polyline
            key={segmentIndex}
            positions={s.latlng}
            pathOptions={{
              color: getSegmentColor(s.type),
              weight: 8,
            }}
            interactive={false}
          />
        ))}
    </Pane>
  );
}

async function loadSegments(segmentsToLoad: readonly string[]) {
  try {
    const segmentsOnRoute = segmentsToLoad
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
