import { GeoJSON, Rectangle } from "react-leaflet";
import { useWorldUserFog } from "../../react-query/useWorldUserFog";
import { LocationStateFog } from "../../services/location-state";

const PATH_OPTIONS = { color: "black", stroke: false, fillOpacity: 0.5 };

interface Props {
  state: LocationStateFog;
}

export function Fog({ state }: Props) {
  const { data: fog } = useWorldUserFog(state.world.slug);

  if (!fog) {
    return (
      <Rectangle
        interactive={false}
        bounds={state.world.bounds}
        pathOptions={PATH_OPTIONS}
      />
    );
  }

  return <GeoJSON data={fog} pathOptions={PATH_OPTIONS} interactive={false} />;
}
