import { useLocationState } from "../../../../services/location-state";
import { EventOverlay } from "./EventOverlay";
import { OtherOverlay } from "./OtherOverlay";
import { RouteOverlay } from "./RouteOverlay";
import { StravaActivityOverlay } from "./StravaActivityOverlay";

export function OverlaySegments() {
  const [state] = useLocationState();

  switch (state.type) {
    case "route":
      return <RouteOverlay />;
    case "event":
      return <EventOverlay />;
    case "strava-activity":
      return <StravaActivityOverlay />;
    default:
      return <OtherOverlay />;
  }
}
