import { useMemo } from "react";
import { useEvent, useStravaSegmentStream } from "../../../react-query";
import {
  adjustStreamForEvent,
  getRouteFromEvent,
} from "../../../services/events";
import { useLocationState } from "../../../services/location-state";
import { HoverStatePreviewEvent } from "../../../types";
import { PreviewRoutePane } from "./PreviewRoutePane";

interface Props {
  state: HoverStatePreviewEvent;
}

export function EventPreview({ state }: Props) {
  const locationState = useLocationState();
  const { data: event } = useEvent(state.event);
  const stravaSegmentId = event
    ? getRouteFromEvent(event)?.stravaSegmentId
    : undefined;

  const { data: latLngStream } = useStravaSegmentStream(
    { stravaSegmentId, stream: "latlng" },
    { enabled: locationState.world?.id === event?.mapId },
  );
  const { data: distanceStream } = useStravaSegmentStream(
    { stravaSegmentId, stream: "distance" },
    { enabled: locationState.world?.id === event?.mapId },
  );

  const stream = useMemo(() => {
    if (!latLngStream || !distanceStream || !event) {
      return;
    }
    return adjustStreamForEvent(event, distanceStream, latLngStream);
  }, [event, latLngStream, distanceStream]);

  return <PreviewRoutePane stream={stream} />;
}
