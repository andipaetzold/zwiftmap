import turfDistance from "@turf/distance";
import {
  lineString as turfLineString,
  point as turfPoint
} from "@turf/helpers";
import turfLength from "@turf/length";
import { Edge, Node, Roads, WORLD_ROADS } from "@zwiftmap/roads";
import type { LatLngTuple } from "leaflet";
import minBy from "lodash-es/minBy";
import { WorldSlug } from "zwift-data";
import { LatLngAlt } from "../types";

export async function navigate(
  from: LatLngTuple,
  to: LatLngTuple,
  worldSlug: WorldSlug
): Promise<LatLngAlt[]> {
  const roads = await WORLD_ROADS[worldSlug]();
  const route = findRoute(from, to, roads);
  if (!route) {
    throw new Error("Could not find route");
  }
  return route;
}

interface NodeWithValue {
  node: Node;
  value: number;
}

function findRoute(
  from: LatLngTuple,
  to: LatLngTuple,
  orgRoads: Roads
): LatLngAlt[] | null {
  const roads = orgRoads.clone();

  const fromNode = roads.splitEdge(roads.snapPoint(from));
  const toNode = roads.splitEdge(roads.snapPoint(to));

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

function getSuccessors(node: Node): Set<Node> {
  return new Set(
    [...node.edges].flatMap((e) => [e.from, e.to]).filter((n) => n !== node)
  );
}

function findShortestEdge(from: Node, to: Node): Edge | undefined {
  return [...from.edges]
    .filter(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from)
    )
    .sort((a, b) => edgeDistance(a) - edgeDistance(b))[0];
}

function createRoute(source: Node, predecessors: Map<Node, Node>): LatLngAlt[] {
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
