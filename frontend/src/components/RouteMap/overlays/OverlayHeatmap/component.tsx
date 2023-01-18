import { LayerGroup, LayersControl, TileLayer } from "react-leaflet";
import { World } from "zwift-data";

interface Props {
  world: World;
}

export function OverlayHeatmapComponent({ world }: Props) {
  return (
    <LayersControl.Overlay name="Heatmap">
      <LayerGroup>
        <TileLayer
          url={`http://localhost:3002/${world.slug}/{z}/{x}/{y}.png`}
          bounds={world.bounds}
        />
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
