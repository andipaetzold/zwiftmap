import { ImageOverlay, LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { BACKEND_HOST } from "../../../../config";

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
    <ImageOverlay
      url={`${BACKEND_HOST}/worlds/${world.slug}/heatmap`}
      bounds={world.bounds}
    />
  );
}
