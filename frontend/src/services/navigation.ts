import { lineString as turfLineString } from "@turf/helpers";
import nearestPointOnLine from "@turf/nearest-point-on-line";
import { LatLngTuple } from "leaflet";
import minBy from "lodash/minBy";
import { Edge, Roads } from "./Roads";

export function snapPoint(point: LatLngTuple, roads: Roads): SnappedPoint {
  const nearestPositions = roads.edges.map((edge) =>
    nearestPointOnLine(turfLineString(edge.stream), point)
  );
  const nearestPosition = minBy(nearestPositions, (pos) => pos.properties.dist);

  return {
    position: nearestPosition!.geometry.coordinates as LatLngTuple,
    sourcePosition: point,
    edge: roads.edges[
      nearestPositions.findIndex((np) => np === nearestPosition)
    ],
    edgeStreamIndex: nearestPosition!.properties.index!,
  };
}

export interface SnappedPoint {
  position: LatLngTuple;
  sourcePosition: LatLngTuple;
  edge: Edge;
  edgeStreamIndex: number;
}
