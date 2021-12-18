import { LatLngTuple } from "leaflet";
import { CircleMarker, Pane } from "react-leaflet";
import { Z_INDEX } from "./constants";

interface Props {
  id: string;
  latlng: LatLngTuple;
}

export function RouteStart({ id, latlng }: Props) {
  return (
    <Pane name={`route-start-${id}`} style={{ zIndex: Z_INDEX.routeStart }}>
      <CircleMarker
        center={latlng}
        radius={5}
        weight={2}
        pathOptions={{
          color: "white",
          fillColor: "green",
          fillOpacity: 1,
        }}
        interactive={false}
      />
    </Pane>
  );
}
