import { Fragment } from "react";
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
import { RoadPosition, Roads } from "../../types";

interface Props {
  world: World;
}

export function RoadLayer({ world }: Props) {
  if (ENVIRONMENT === "production") {
    return null;
  }

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
  const { result: roads } = useAsync<Roads | undefined>(
    async (s: WorldSlug) => WORLD_ROADS[s]?.(),
    [world.slug]
  );

  if (!roads) {
    return null;
  }
  return (
    <>
      {roads.edges.map(({ stream, from, to }, streamIndex) => (
        <Polyline
          key={streamIndex}
          interactive={false}
          positions={[
            dropAltitude(roads.nodes.find((n) => n.id === from)!.position),
            ...stream.map(dropAltitude),
            dropAltitude(roads.nodes.find((n) => n.id === to)!.position),
          ]}
        />
      ))}
      {roads.nodes.map(({ id, position }, nodeIndex) => (
        <CircleMarker
          key={nodeIndex}
          center={[position[0], position[1]]}
          radius={5}
        >
          <Popup>
            <pre>{JSON.stringify({ id, position }, undefined, 2)}</pre>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

function dropAltitude(p: RoadPosition): [number, number] {
  return [p[0], p[1]];
}
