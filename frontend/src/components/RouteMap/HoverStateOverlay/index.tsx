import { useStore } from "../../../hooks/useStore";
import { HoverStateType } from "../../../types";
import { EventPreview } from "./EventPreview";
import { LatLngStreamPreview } from "./LatLngStreamPreview";
import { RoutePreview } from "./RoutePreview";
import { SegmentPreview } from "./SegmentPreview";

export function HoverStateOverlay() {
  const hoverState = useStore((store) => store.hoverState);

  switch (hoverState?.type) {
    case HoverStateType.PreviewEvent:
      return <EventPreview state={hoverState} />;
    case HoverStateType.PreviewLatLngStream:
      return <LatLngStreamPreview state={hoverState} />;
    case HoverStateType.PreviewRoute:
      return <RoutePreview state={hoverState} />;
    case HoverStateType.PreviewSegment:
      return <SegmentPreview state={hoverState} />;
    default:
      return null;
  }
}
