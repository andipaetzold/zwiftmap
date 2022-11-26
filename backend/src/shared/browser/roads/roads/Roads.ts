import { lineString, lineString as turfLineString } from "@turf/helpers";
import turfNearestPointOnLine from "@turf/nearest-point-on-line";
import { minBy, round } from "lodash-es";
import { LatLng, LatLngAlt, SnappedPoint } from "../types.js";

export class Roads {
  #nodes = new Set<RoadsNode>();
  #edges = new Set<RoadsEdge>();

  get edges(): ReadonlyArray<RoadsEdge> {
    return [...this.#edges];
  }

  get nodes(): ReadonlyArray<RoadsNode> {
    return [...this.#nodes];
  }

  createNode(position: LatLngAlt): RoadsNode {
    const newNode: RoadsNode = {
      position,
      edges: new Set(),
    };
    this.#nodes.add(newNode);
    return newNode;
  }

  createEdge(
    from: RoadsNode,
    to: RoadsNode,
    stream: LatLngAlt[],
    fog = true
  ): RoadsEdge {
    if (!this.#nodes.has(from)) {
      throw new Error("`from` must be added to `node` first");
    }

    if (!this.#nodes.has(to)) {
      throw new Error("`to` must be added to `node` first");
    }

    const fullStream = [from.position, ...stream, to.position];

    const edge: RoadsEdge = { from, to, stream: fullStream, fog };

    from.edges.add(edge);
    to.edges.add(edge);

    this.#edges.add(edge);

    return edge;
  }

  clone(): Roads {
    const newRoads = new Roads();

    const newNodes = new Map<RoadsNode, RoadsNode>();
    for (const node of this.#nodes) {
      const newNode = newRoads.createNode(node.position);
      newNodes.set(node, newNode);
    }

    for (const edge of this.#edges) {
      newRoads.createEdge(
        newNodes.get(edge.from)!,
        newNodes.get(edge.to)!,
        edge.stream.slice(1, -1)
      );
    }

    return newRoads;
  }

  splitEdge({ edge, edgeStreamIndex, position }: SnappedPoint): RoadsNode {
    this.#edges.delete(edge);
    edge.from.edges.delete(edge);
    edge.to.edges.delete(edge);

    const nearestExistingPoint = edge.stream[edgeStreamIndex];
    const newNode = this.createNode([
      position[0],
      position[1],
      nearestExistingPoint[2],
    ]);

    const fromStream = edge.stream.slice(0, edgeStreamIndex);
    const toStream = edge.stream.slice(edgeStreamIndex + 1);

    if (fromStream.length === 0) {
      fromStream.push(nearestExistingPoint);
    } else if (toStream.length === 0) {
      toStream.unshift(nearestExistingPoint);
    } else if (
      turfNearestPointOnLine(
        lineString([fromStream[fromStream.length - 1], nearestExistingPoint]),
        position
      ).properties.dist! <
      turfNearestPointOnLine(
        lineString([nearestExistingPoint, toStream[0]]),
        position
      ).properties.dist!
    ) {
      toStream.unshift(nearestExistingPoint);
    } else {
      fromStream.push(nearestExistingPoint);
    }

    const fromEdge = this.createEdge(edge.from, newNode, fromStream.slice(1));
    const toEdge = this.createEdge(newNode, edge.to, toStream.slice(0, -1));

    this.#edges.add(fromEdge);
    this.#edges.add(toEdge);

    return newNode;
  }

  snapPoint(point: LatLng): SnappedPoint {
    const nearestPositions = this.edges.map((edge) =>
      turfNearestPointOnLine(turfLineString(edge.stream), point)
    );
    const nearestPosition = minBy(
      nearestPositions,
      (pos) => pos.properties.dist
    );

    const coordinates = nearestPosition!.geometry.coordinates;
    const position = [
      round(coordinates[0], 6),
      round(coordinates[1], 6),
      coordinates[2],
    ] as LatLngAlt;

    return {
      position,
      sourcePosition: point,
      edge: this.edges[
        nearestPositions.findIndex((np) => np === nearestPosition)
      ],
      edgeStreamIndex: nearestPosition!.properties.index!,
    };
  }
}

export interface RoadsNode {
  position: LatLngAlt;
  edges: Set<RoadsEdge>;
}

export interface RoadsEdge {
  from: RoadsNode;
  to: RoadsNode;
  stream: LatLngAlt[];
  fog: boolean;
}
