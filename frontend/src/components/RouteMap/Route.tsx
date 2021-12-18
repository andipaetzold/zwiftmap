import { LatLngTuple } from "leaflet";
import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../constants";
import { Z_INDEX } from "./constants";
import { RouteEnd } from "./RouteEnd";
import { RouteStart } from "./RouteStart";

interface Props {
  latlng: LatLngTuple[];
}

export function Route({ latlng }: Props) {
  return (
    <>
      <Pane name="route" style={{ zIndex: Z_INDEX.route }}>
        <Polyline
          positions={latlng}
          pathOptions={{ color: COLORS.route, weight: 5 }}
          interactive={false}
        />
      </Pane>
      <RouteStart latlng={latlng[0]} />
      <RouteEnd latlng={latlng[latlng.length - 1]} />
    </>
  );
}
