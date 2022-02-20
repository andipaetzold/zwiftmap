import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../../constants";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../../types";
import { POLYLINE_WIDTH, Z_INDEX } from "../../constants";
import { CustomRouteMarkers } from "../../custom-route/CustomRouteMarkers";
import { useCustomRouteClick } from "../../custom-route/useCustomRouteClick";

const ID = "OverlaySegments-EventOverlay";

interface Props {
  state: LocationStateCustomRoute;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function CustomRouteOverlay({ state, streams }: Props) {
  useCustomRouteClick(state);

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
      <CustomRouteMarkers state={state} />
    </>
  );
}
