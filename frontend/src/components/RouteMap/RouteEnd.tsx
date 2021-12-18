import { LatLngTuple } from "leaflet";
import { CircleMarker, Pane } from "react-leaflet";
import { Z_INDEX } from "./constants";

interface Props {
  latlng: LatLngTuple;
}

export function RouteEnd({ latlng }: Props) {
  return (
    <Pane name="route-end" style={{ zIndex: Z_INDEX.routeEnd }}>
      <CircleMarker
        center={latlng}
        radius={5}
        weight={2}
        pathOptions={{
          color: "white",
          fillColor: "red",
          fillOpacity: 1,
        }}
        interactive={false}
      />
    </Pane>
  );
}
