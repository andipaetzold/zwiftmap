import { routes } from "zwift-data";
import { useStravaSegmentStream } from "../../../react-query";
import { HoverStatePreviewRoute } from "../../../types";
import { PreviewRoutePane } from "./PreviewRoutePane";

interface Props {
  state: HoverStatePreviewRoute;
}

export function RoutePreview({ state }: Props) {
  const segmentId = routes.find((r) => r.slug === state.route)?.stravaSegmentId;
  const { data: stream } = useStravaSegmentStream({
    stravaSegmentId: segmentId,
    stream: "latlng",
  });

  return <PreviewRoutePane stream={stream} />;
}
