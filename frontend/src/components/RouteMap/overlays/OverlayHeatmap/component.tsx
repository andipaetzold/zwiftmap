import { LayerGroup, LayersControl, TileLayer } from "react-leaflet";
import { World } from "zwift-data";

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
  return (
    <TileLayer
      url={`http://localhost:3001/{z}/{x}/{y}.png`}
      bounds={world.bounds}
    />
  );
}
