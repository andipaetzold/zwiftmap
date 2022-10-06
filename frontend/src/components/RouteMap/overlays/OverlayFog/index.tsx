import { LayerGroup, LayersControl, Pane, Rectangle } from "react-leaflet";
import { World } from "zwift-data";
import { ENVIRONMENT } from "../../../../config";

interface Props {
  world: World;
}

export function OverlayFog({ world }: Props) {
  if (ENVIRONMENT === "production") {
    return null;
  }

  return (
    <LayersControl.Overlay name="Fog">
      <Pane name="OverlayFog">
        <Rectangle
          interactive={false}
          pathOptions={{ color: "black", stroke: false, fillOpacity: 0.5 }}
          bounds={world.bounds}
        />
      </Pane>
    </LayersControl.Overlay>
  );
}
