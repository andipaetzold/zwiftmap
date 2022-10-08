import { useMemo } from "react";
import { useStravaSegmentStream } from "../../../react-query";
import { useEvent } from "../../../react-query/useEvent";
import {
  adjustStreamForEvent,
  getRouteFromEvent,
} from "../../../services/events";
import { HoverStatePreviewEvent } from "../../../types";
import { PreviewRoutePane } from "./PreviewRoutePane";

interface Props {
  state: HoverStatePreviewEvent;
}

export function EventPreview({ state }: Props) {
  const { data: event } = useEvent(state.event);
  const stravaSegmentId = event
    ? getRouteFromEvent(event)?.stravaSegmentId
    : undefined;

  const { data: latLngStream } = useStravaSegmentStream({
    stravaSegmentId,
    stream: "latlng",
  });
  const { data: distanceStream } = useStravaSegmentStream({
    stravaSegmentId,
    stream: "distance",
  });

  const stream = useMemo(() => {
    if (!latLngStream || !distanceStream || !event) {
      return;
    }
    return adjustStreamForEvent(event, distanceStream, latLngStream);
  }, [event, latLngStream, distanceStream]);

  return <PreviewRoutePane stream={stream} />;
}
