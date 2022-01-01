import * as Sentry from "@sentry/react";
import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { segments, SegmentType } from "zwift-data";
import { getSegmentColor } from "../../../../../constants";
import { useStore } from "../../../../../hooks/useStore";
import { getStravaSegmentStreams } from "../../../../../services/StravaSegmentRepository";
import { HoverStateType } from "../../../../../types";
import {
  POLYLINE_WIDTH,
  POLYLINE_WIDTH_HIGHLIGHTED,
  Z_INDEX,
} from "../../../constants";

const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

interface SegmentsPaneProps {
  segmentSlugs: string[];
}

export function SegmentsPane({ segmentSlugs }: SegmentsPaneProps) {
  const hoverState = useStore((state) => state.hoverState);
  const { result: segmentsData } = useAsync(loadSegments, [segmentSlugs]);

  if (!segmentsData) {
    return null;
  }

  return (
    <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
      {segmentsData
        .filter((segment) => SEGMENTS_TO_DISPLAY.includes(segment.type))
        .map((segment) => (
          <Polyline
            key={segment.slug}
            positions={segment.latlng}
            pathOptions={{
              color: getSegmentColor(segment.type),
              weight:
                hoverState?.type === HoverStateType.HighlightSegment &&
                hoverState.segment === segment.slug
                  ? POLYLINE_WIDTH_HIGHLIGHTED
                  : POLYLINE_WIDTH,
              lineCap: "square",
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
        getStravaSegmentStreams(s.stravaSegmentId!, ["latlng"])
      )
    );

    return streams.map((stream, streamIndex) => ({
      latlng: stream.latlng,
      type: segmentsOnRoute[streamIndex].type,
      slug: segmentsOnRoute[streamIndex].slug,
    }));
  } catch (e) {
    Sentry.captureException(e);
  }
}
