import { PathOptions } from "leaflet";
import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { useStravaPersonalHeatmap } from "../../../../react-query";

const PATH_OPTIONS: PathOptions = { color: "black", weight: 5, opacity: 0.75 };

interface Props {
  world: World;
}

export function OverlayHeatmapComponent({ world }: Props) {
  return (
    <LayersControl.Overlay name="Heatmap">
      <LayerGroup>
        <Lines world={world} />
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

interface Props {
  world: World;
}

function Lines({ world }: Props) {
  const { data } = useStravaPersonalHeatmap(world.slug);

  if (!data) {
    return null;
  }

  return <GeoJSON data={data} pathOptions={PATH_OPTIONS} interactive={false} />;
}
