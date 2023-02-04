import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  Polyline,
  Popup,
} from "react-leaflet";
import { World } from "zwift-data";
import { useWorldRoads } from "../../../../react-query";
import { dropAltitude } from "../../../../util/drop-altitude";

interface Props {
  world: World;
}

export function OverlayDebugRoadsComponent({ world }: Props) {
  return (
    <LayersControl.Overlay name="Roads">
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
  const { data: roads } = useWorldRoads(world.slug);

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
          pathOptions={{ color: edge.fog ? "#3388ff" : "lightblue" }}
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
