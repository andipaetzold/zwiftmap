import { lineString, lineString as turfLineString } from "@turf/helpers";
import turfNearestPointOnLine from "@turf/nearest-point-on-line";
import { LatLngTuple } from "leaflet";
import minBy from "lodash-es/minBy";
import round from "lodash-es/round";
import { SnappedPoint } from "./types";
import { LatLngAlt } from "@zwiftmap/types";

export class Roads {
  private _nodes = new Set<Node>();
  private _edges = new Set<Edge>();

  public get edges(): ReadonlyArray<Edge> {
    return [...this._edges];
  }

  public get nodes(): ReadonlyArray<Node> {
    return [...this._nodes];
  }

  public createNode(position: LatLngAlt): Node {
    const newNode: Node = {
      position,
      edges: new Set(),
    };
    this._nodes.add(newNode);
    return newNode;
  }

  public createEdge(from: Node, to: Node, stream: LatLngAlt[]): Edge {
    if (!this._nodes.has(from)) {
      throw new Error("`from` must be added to `node` first");
    }

    if (!this._nodes.has(to)) {
      throw new Error("`to` must be added to `node` first");
    }

    const fullStream = [from.position, ...stream, to.position];

    const edge = { from, to, stream: fullStream };

    from.edges.add(edge);
    to.edges.add(edge);

    this._edges.add(edge);

    return edge;
  }

  public clone(): Roads {
    const newRoads = new Roads();

    const newNodes = new Map<Node, Node>();
    for (const node of this._nodes) {
      const newNode = newRoads.createNode(node.position);
      newNodes.set(node, newNode);
    }

    for (const edge of this._edges) {
      newRoads.createEdge(
        newNodes.get(edge.from)!,
        newNodes.get(edge.to)!,
        edge.stream.slice(1, -1)
      );
    }

    return newRoads;
  }

  public splitEdge({ edge, edgeStreamIndex, position }: SnappedPoint): Node {
    this._edges.delete(edge);
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

    this._edges.add(fromEdge);
    this._edges.add(toEdge);

    return newNode;
  }

  public snapPoint(point: LatLngTuple): SnappedPoint {
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

export interface Node {
  position: LatLngAlt;
  edges: Set<Edge>;
}

export interface Edge {
  from: Node;
  to: Node;
  stream: LatLngAlt[];
}
