import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../../constants";
import { DistanceStream, LatLngStream } from "../../../../types";
import { POLYLINE_WIDTH, Z_INDEX } from "../../constants";

const ID = "OverlaySegments-OtherOverlay";

interface Props {
  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function OtherOverlay({ streams }: Props) {
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
