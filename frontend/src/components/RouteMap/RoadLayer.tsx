import { useAsync } from "react-async-hook";
import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  Polyline,
  Popup,
} from "react-leaflet";
import { World, WorldSlug } from "zwift-data";
import { ENVIRONMENT } from "../../config";
import { WORLD_ROADS } from "../../constants/roads";
import { Roads } from "../../services/Roads";
import { dropAltitude } from "../../util/drop-altitude";

interface Props {
  world: World;
}

export function RoadLayer({ world }: Props) {
  if (ENVIRONMENT === "production") {
    return null;
  }

  return (
    <LayersControl.Overlay name="Roads" checked>
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
  const { result: roads } = useAsync<Roads | undefined>(
    async (s: WorldSlug) => WORLD_ROADS[s]?.(),
    [world.slug]
  );

  if (!roads) {
    return null;
  }
  return (
    <>
      {roads.edges.map((edge, edgeIndex) => (
        <Polyline
          key={edgeIndex}
          interactive={false}
          positions={edge.stream.map(dropAltitude)}
        />
      ))}
      {roads.nodes.map(({ position }, nodeIndex) => (
        <CircleMarker
          key={nodeIndex}
          center={[position[0], position[1]]}
          radius={5}
        >
          <Popup>
            <pre>
              {JSON.stringify({ index: nodeIndex, position }, undefined, 2)}
            </pre>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}
