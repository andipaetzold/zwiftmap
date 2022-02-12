import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../../constants";
import { LocationStateRouting } from "../../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../../types";
import { POLYLINE_WIDTH, Z_INDEX } from "../../constants";
import { RoutingMarkers } from "../../routing/RoutingMarkers";
import { useRoutingClick } from "../../routing/useRoutingClick";

const ID = "OverlaySegments-EventOverlay";

interface Props {
  state: LocationStateRouting;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function RoutingOverlay({ state, streams }: Props) {
  useRoutingClick(state);

  if (!streams) {
    return null;
  }

  return (
    <>
      <Pane name={`${ID}-route`} style={{ zIndex: Z_INDEX.route }}>
        <Polyline
          positions={streams.latlng}
          pathOptions={{
            color: COLORS.route,
            weight: POLYLINE_WIDTH,
            lineCap: "square",
          }}
          interactive={false}
        />
      </Pane>
      <RoutingMarkers state={state} />
    </>
  );
}
