import {
  lineString as turfLineString,
  point as turfPoint,
} from "@turf/helpers";
import nearestPointOnLine from "@turf/nearest-point-on-line";
import { LatLngTuple } from "leaflet";
import minBy from "lodash/minBy";
import { Edge, Roads, Node, RoadPosition } from "./Roads";
import turfDistance from "@turf/distance";
import turfLength from "@turf/length";

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

interface NodeWithValue {
  node: Node;
  value: number;
}

export function findRoute(
  from: LatLngTuple,
  to: LatLngTuple,
  orgRoads: Roads
): RoadPosition[] | undefined {
  const roads = orgRoads.clone();

  const snapFrom = snapPoint(from, roads);
  const snapTo = snapPoint(to, roads);

  const fromNode = roads.splitEdge(snapFrom);
  const toNode = roads.splitEdge(snapTo);

  const estimateDistanceByNode = getEstimationMap(roads.nodes, toNode);
  const distancesByNode = new Map<Node, number>();
  const predecessors = new Map<Node, Node>();

  for (const node of roads.nodes) {
    distancesByNode.set(node, Infinity);
  }

  const open: NodeWithValue[] = [];
  open.push({ node: fromNode, value: 0 });
  distancesByNode.set(fromNode, 0);

  const closed = new Set<Node>();

  while (open.length > 0) {
    const currentNode = minBy([...open], ({ value }) => value)!;
    open.splice(
      open.findIndex((x) => currentNode === x),
      1
    );

    if (currentNode.node === toNode) {
      return createRoute(toNode, predecessors);
    }

    closed.add(currentNode.node);

    for (const successor of getSuccessor(currentNode.node)) {
      if (closed.has(successor.node)) {
        continue;
      }

      const tentativeDistance =
        distancesByNode.get(currentNode.node)! + edgeDistance(successor.edge);

      const nodeInOpen = open.find(({ node }) => successor.node === node);
      if (
        nodeInOpen &&
        tentativeDistance >= distancesByNode.get(successor.node)!
      ) {
        continue;
      }

      predecessors.set(successor.node, currentNode.node);
      distancesByNode.set(successor.node, tentativeDistance);
      const f = tentativeDistance + estimateDistanceByNode.get(successor.node)!;

      if (nodeInOpen) {
        nodeInOpen.value = f;
      } else {
        open.push({
          node: successor.node,
          value: f,
        });
      }
    }
  }
}

function distance(from: Node, to: Node): number {
  return turfDistance(turfPoint(from.position), turfPoint(to.position));
}

function edgeDistance(edge: Edge): number {
  return turfLength(turfLineString(edge.stream.map((p) => [p[0], p[1]])));
}

function getEstimationMap(
  nodes: ReadonlyArray<Node>,
  destination: Node
): ReadonlyMap<Node, number> {
  const result = new Map<Node, number>();
  for (const node of nodes) {
    result.set(node, distance(node, destination));
  }
  return result;
}

function getSuccessor(node: Node): Set<{ node: Node; edge: Edge }> {
  return new Set(
    [...node.edges].flatMap((edge) => [
      { node: edge.from, edge },
      { node: edge.to, edge },
    ])
  );
}

function createRoute(
  source: Node,
  predecessors: Map<Node, Node>
): RoadPosition[] {
  const result: RoadPosition[] = [];

  let cur = source;
  while (predecessors.has(cur)) {
    const next = predecessors.get(cur)!;

    const forwardStream = [...cur.edges].find(
      // eslint-disable-next-line no-loop-func
      (e) => e.from === cur && e.to === next
    )?.stream;

    if (forwardStream) {
      result.push(...forwardStream);
    } else {
      const backwardsStream = [...cur.edges].find(
        // eslint-disable-next-line no-loop-func
        (e) => e.to === cur && e.from === next
      )!.stream;
      result.push(...backwardsStream.reverse());
    }

    cur = next;
  }

  return result;
}
