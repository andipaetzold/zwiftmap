import { useLocationState } from "../../../../services/location-state";
import { EventOverlay } from "./EventOverlay";
import { OtherOverlay } from "./OtherOverlay";
import { RouteOverlay } from "./RouteOverlay";
import { RoutingOverlay } from "./RoutingOverlay";
import { StravaActivityOverlay } from "./StravaActivityOverlay";

export function OverlaySegments() {
  const state = useLocationState();

  switch (state.type) {
    case "route":
      return <RouteOverlay state={state} />;
    case "event":
      return <EventOverlay state={state} />;
    case "strava-activity":
      return <StravaActivityOverlay state={state} />;
    case "routing":
      return <RoutingOverlay state={state} />;
    default:
      return <OtherOverlay state={state} />;
  }
}
