export interface Roads {
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  id: NodeId;
  position: RoadPosition;
}

export type NodeId = number;

export interface Edge {
  from: NodeId;
  to: NodeId;
  stream: RoadPosition[];
}

export type RoadPosition = [
  latitude: number,
  longitude: number,
  altitude: number
];
