import { routes } from "zwift-data";
import { useStravaSegmentStream } from "../../../react-query";
import { HoverStatePreviewSegment } from "../../../types";
import { PreviewRoutePane } from "./PreviewRoutePane";

interface Props {
  state: HoverStatePreviewSegment;
}

export function SegmentPreview({ state }: Props) {
  const segmentId = routes.find((r) => r.slug === state.segment)
    ?.stravaSegmentId;
  const { data: stream } = useStravaSegmentStream({
    stravaSegmentId: segmentId,
    stream: "latlng",
  });

  return <PreviewRoutePane stream={stream} />;
}
