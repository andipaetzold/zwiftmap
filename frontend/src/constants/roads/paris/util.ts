import { Edge, Node, RoadPosition } from "../../../types";

export function createEdge(from: Node, to: Node, stream: RoadPosition[]): Edge {
  const fullStream = [from.position, ...stream, to.position];
  return {
    from: from.id,
    to: to.id,
    stream: fullStream,
  };
}
