import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../constants";
import { LocationState } from "../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../types";
import { POLYLINE_WIDTH, Z_INDEX } from "../constants";
import { useCustomRouteClick } from "../custom-route/useCustomRouteClick";
import { usePlaceNewMarkerMove } from "../place-new/useCustomRouteClick";

const ID = "OverlayNone";

interface Props {
  state: LocationState;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function OverlayNone({ state, streams }: Props) {
  useCustomRouteClick(state);
  usePlaceNewMarkerMove(state);

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
    </>
  );
}
