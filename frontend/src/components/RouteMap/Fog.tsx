import { Rectangle } from "react-leaflet";
import { LocationStateFog } from "../../services/location-state";

interface Props {
  state: LocationStateFog;
}

export function Fog({ state }: Props) {
  return (
    <Rectangle
      bounds={state.world.bounds}
      pathOptions={{ color: "black", stroke: false, fillOpacity: 0.5 }}
    />
  );
}
