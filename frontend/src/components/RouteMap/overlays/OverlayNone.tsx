import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../constants";
import { useLocationState } from "../../../services/location-state";
import { POLYLINE_WIDTH, Z_INDEX } from "../constants";
import { loadRoute } from "../loaders/route";
import { RouteEnd } from "../RouteEnd";
import { RouteStart } from "../RouteStart";

const ID = "OverlayNone";

export function OverlayNone() {
  const state = useLocationState();

  const { result: streams } = useAsync(loadRoute, [state]);

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
      <RouteStart id={ID} latlng={streams.latlng[0]} />
      <RouteEnd id={ID} latlng={streams.latlng[streams.latlng.length - 1]} />
    </>
  );
}
