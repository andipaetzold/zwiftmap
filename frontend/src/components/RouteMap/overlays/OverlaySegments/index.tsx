import { useLocationState } from "../../../../services/location-state";
import { NonRouteOverlay } from "./NonRouteOverlay";
import { RouteOverlay } from "./RouteOverlay";

export function OverlaySegments() {
  const [state] = useLocationState();

  if (state.type === "route") {
    return <RouteOverlay />;
  }

  return <NonRouteOverlay />;
}
