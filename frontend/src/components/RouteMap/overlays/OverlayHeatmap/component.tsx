import { LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { useStravaPersonalHeatmap } from "../../../../react-query";

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
  useStravaPersonalHeatmap(world.slug);

  return null;
}
