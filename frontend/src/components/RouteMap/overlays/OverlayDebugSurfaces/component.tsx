import { LayerGroup, LayersControl, Polygon } from "react-leaflet";
import { World } from "zwift-data";
import { ENVIRONMENT } from "../../../../config";
import { SURFACE_CONSTANTS, worldConfigs } from "../../../../constants";

interface Props {
  world: World;
}

export function OverlayDebugSurfacesComponent({ world }: Props) {
  if (ENVIRONMENT === "production") {
    return null;
  }

  const worldConfig = worldConfigs[world.slug];

  return (
    <LayersControl.Overlay name="Surfaces">
      <LayerGroup>
        {worldConfig.surfaces.map((s, surfaceIndex) => (
          <Polygon
            key={surfaceIndex}
            interactive={false}
            pathOptions={{ color: SURFACE_CONSTANTS[s.type].color }}
            positions={s.polygon}
          />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
