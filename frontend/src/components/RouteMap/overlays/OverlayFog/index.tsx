import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import { Feature, lineString, MultiPolygon } from "@turf/helpers";
import { useMemo } from "react";
import {
  LayerGroup,
  LayersControl,
  Pane,
  Polygon,
  Rectangle,
} from "react-leaflet";
import { World } from "zwift-data";
import { ENVIRONMENT } from "../../../../config";
import { LatLngStream } from "../../../../types";
import {
  latLngToPosition,
  positionToLatLng,
} from "../../../../util/coordinates";

const BUFFER_RADIUS = 0.05; // 50 m

interface Props {
  world: World;
  stream?: LatLngStream;
}

export function OverlayFog({ world, stream }: Props) {
  const fogPolygon = useMemo(() => {
    if (!stream || ENVIRONMENT === "production") {
      return;
    }

    const boundsPolygon = bboxPolygon([
      world.bounds[0][1],
      world.bounds[0][0],
      world.bounds[1][1],
      world.bounds[1][0],
    ]);

    const lngLatStream = stream.map(latLngToPosition);
    const line = lineString(lngLatStream);
    const linePolygon = buffer(line, BUFFER_RADIUS, { units: "kilometers" });

    const finalPolygon = difference(boundsPolygon, linePolygon)!;
    if (finalPolygon.geometry.type === "Polygon") {
      return finalPolygon.geometry.coordinates.map((polOrMulti) =>
        polOrMulti.map(positionToLatLng)
      );
    } else {
      return (finalPolygon as Feature<MultiPolygon>).geometry.coordinates.map(
        (polygon) => polygon.map((stream) => stream.map(positionToLatLng))
      );
    }
  }, [stream]);

  if (ENVIRONMENT === "production") {
    return null;
  }

  return (
    <LayersControl.Overlay name="Fog">
      <LayerGroup>
        <Pane name="OverlayFog">
          {fogPolygon ? (
            <Polygon
              positions={fogPolygon}
              interactive={false}
              pathOptions={{ color: "black", stroke: false, fillOpacity: 0.5 }}
            />
          ) : (
            <Rectangle
              bounds={world.bounds}
              pathOptions={{ color: "black", stroke: false, fillOpacity: 0.5 }}
            />
          )}
        </Pane>
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
