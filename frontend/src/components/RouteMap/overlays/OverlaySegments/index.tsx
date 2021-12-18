import { useLocationState } from "../../../../services/location-state";
import { EventOverlay } from "./EventOverlay";
import { OtherOverlay } from "./OtherOverlay";
import { RouteOverlay } from "./RouteOverlay";

export function OverlaySegments() {
  const [state] = useLocationState();

  switch (state.type) {
    case "route":
      return <RouteOverlay />;
    case "event":
      return <EventOverlay />;
    default:
      return <OtherOverlay />;
  }
}
