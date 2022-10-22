import { minBy } from "lodash-es";
import { Roads, RoadsEdge, RoadsNode } from "./roads/Roads.js";
import { LatLng, LatLngAlt } from "./types.js";
import turfDistance from "@turf/distance";
import {
  lineString as turfLineString,
  point as turfPoint,
} from "@turf/helpers";
import turfLength from "@turf/length";

interface NodeWithValue {
  node: RoadsNode;
  value: number;
}

export function findRoute(
  from: LatLng,
  to: LatLng,
  orgRoads: Roads
): LatLngAlt[] | null {
  const roads = orgRoads.clone();

  const fromNode = roads.splitEdge(roads.snapPoint(from));
  const toNode = roads.splitEdge(roads.snapPoint(to));

  const estimateDistanceByNode = getEstimationMap(roads.nodes, toNode);
  const distancesByNode = new Map<RoadsNode, number>();
  const predecessors = new Map<RoadsNode, RoadsNode>();

  for (const node of roads.nodes) {
    distancesByNode.set(node, Infinity);
  }

  const open: NodeWithValue[] = [];
  open.push({ node: fromNode, value: 0 });
  distancesByNode.set(fromNode, 0);

  const closed = new Set<RoadsNode>();

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

    for (const successor of getSuccessors(currentNode.node)) {
      if (closed.has(successor)) {
        continue;
      }

      const successorEdge = findShortestEdge(currentNode.node, successor)!;

      const tentativeDistance =
        distancesByNode.get(currentNode.node)! + edgeDistance(successorEdge);

      const nodeInOpen = open.find(({ node }) => successor === node);
      if (nodeInOpen && tentativeDistance >= distancesByNode.get(successor)!) {
        continue;
      }

      predecessors.set(successor, currentNode.node);
      distancesByNode.set(successor, tentativeDistance);
      const f = tentativeDistance + estimateDistanceByNode.get(successor)!;

      if (nodeInOpen) {
        nodeInOpen.value = f;
      } else {
        open.push({
          node: successor,
          value: f,
        });
      }
    }
  }

  return null;
}

function distance(from: RoadsNode, to: RoadsNode): number {
  return turfDistance(turfPoint(from.position), turfPoint(to.position));
}

function edgeDistance(edge: RoadsEdge): number {
  return turfLength(turfLineString(edge.stream.map((p) => [p[0], p[1]])));
}

function getEstimationMap(
  nodes: ReadonlyArray<RoadsNode>,
  destination: RoadsNode
): ReadonlyMap<RoadsNode, number> {
  const result = new Map<RoadsNode, number>();
  for (const node of nodes) {
    result.set(node, distance(node, destination));
  }
  return result;
}

function getSuccessors(node: RoadsNode): Set<RoadsNode> {
  return new Set(
    [...node.edges].flatMap((e) => [e.from, e.to]).filter((n) => n !== node)
  );
}

function findShortestEdge(
  from: RoadsNode,
  to: RoadsNode
): RoadsEdge | undefined {
  return [...from.edges]
    .filter(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from)
    )
    .sort((a, b) => edgeDistance(a) - edgeDistance(b))[0];
}

function createRoute(
  source: RoadsNode,
  predecessors: Map<RoadsNode, RoadsNode>
): LatLngAlt[] {
  const result: LatLngAlt[] = [];

  let cur = source;
  while (predecessors.has(cur)) {
    const next = predecessors.get(cur)!;

    const edge = findShortestEdge(cur, next)!;
    if (edge.from === cur) {
      result.push(...edge.stream);
    } else {
      result.push(...[...edge.stream].reverse());
    }

    cur = next;
  }

  return result.reverse();
}
