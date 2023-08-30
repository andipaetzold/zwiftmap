import { useQueries } from "@tanstack/react-query";
import { Pane, Polyline } from "react-leaflet";
import { Segment, segments, SegmentType } from "zwift-data";
import { getSegmentColor } from "../../../../../constants";
import { useStore } from "../../../../../hooks/useStore";
import { getStravaSegmentStreamQueryOptions } from "../../../../../react-query";
import { HoverStateType, LatLngStream } from "../../../../../types";
import {
  POLYLINE_WIDTH,
  POLYLINE_WIDTH_HIGHLIGHTED,
  Z_INDEX,
} from "../../../constants";

const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

type Data = Segment & { latlng: LatLngStream };

interface SegmentsPaneProps {
  segmentSlugs: string[];
}

export function SegmentsPane({ segmentSlugs }: SegmentsPaneProps) {
  const hoverState = useStore((state) => state.hoverState);

  const segementsToLoad = segmentSlugs
    .map((segmentSlug) => segments.find((s) => s.slug === segmentSlug)!)
    .filter((segment) => SEGMENTS_TO_DISPLAY.includes(segment.type))
    .filter((segment) => segment.stravaSegmentId !== undefined);

  const results = useQueries({
    queries: segementsToLoad.map((segment) =>
      getStravaSegmentStreamQueryOptions<"latlng", Data>(
        {
          stravaSegmentId: segment.stravaSegmentId!,
          stream: "latlng",
        },
        {
          select: (latlng: LatLngStream) => ({ ...segment, latlng }),
        },
      ),
    ),
  });

  return (
    <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
      {results
        .map((result) => result.data)
        .filter((data): data is Data => data !== undefined)
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
