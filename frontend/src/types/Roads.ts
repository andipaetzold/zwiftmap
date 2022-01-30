export interface Roads {
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  position: RoadPosition;
  edges: Set<Edge>;
}

export interface Edge {
  from: Node;
  to: Node;
  stream: RoadPosition[];
}

export type RoadPosition = [
  latitude: number,
  longitude: number,
  altitude: number
];
