import { GeoJSON, Rectangle } from "react-leaflet";
import { useStravaFogGeoJSON } from "../../react-query";
import { LocationStateFog } from "../../services/location-state";

const PATH_OPTIONS = { color: "black", stroke: false, fillOpacity: 0.75 };

interface Props {
  state: LocationStateFog;
}

export function Fog({ state }: Props) {
  const { data: fog } = useStravaFogGeoJSON(state.world.slug);

  if (!fog) {
    return (
      <Rectangle
        interactive={false}
        bounds={[
          [state.world.bounds[0][0] + 1, state.world.bounds[0][1] - 1],
          [state.world.bounds[1][0] - 1, state.world.bounds[1][1] + 1],
        ]}
        pathOptions={PATH_OPTIONS}
      />
    );
  }

  return <GeoJSON data={fog} pathOptions={PATH_OPTIONS} interactive={false} />;
}
