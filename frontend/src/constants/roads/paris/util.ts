import { Edge, Node, RoadPosition } from "../../../types";

export function createEdge(from: Node, to: Node, stream: RoadPosition[]): Edge {
  const fullStream = [from.position, ...stream, to.position];

  const edge = {
    from,
    to,
    stream: fullStream,
  };

  from.edges.add(edge);
  to.edges.add(edge);

  return edge;
}

export function createNode(position: RoadPosition): Node {
  return {
    position,
    edges: new Set(),
  };
}
