export class Roads {
  private _nodes = new Set<Node>();
  private _edges = new Set<Edge>();

  public get edges(): ReadonlyArray<Edge> {
    return [...this._edges];
  }

  public get nodes(): ReadonlyArray<Node> {
    return [...this._nodes];
  }

  public createNode(position: RoadPosition): Node {
    const newNode: Node = {
      position,
      edges: new Set(),
    };
    this._nodes.add(newNode);
    return newNode;
  }

  public createEdge(from: Node, to: Node, stream: RoadPosition[]): Edge {
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
      newNodes.set(node, newRoads.createNode(node.position));
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

  public splitEdge({
    edge,
    edgeStreamIndex,
  }: {
    edge: Edge;
    edgeStreamIndex: number;
  }): void {
    this._edges.delete(edge);
    edge.from.edges.delete(edge);
    edge.to.edges.delete(edge);

    const newNode = this.createNode(edge.stream[edgeStreamIndex]);
    const fromEdge = this.createEdge(
      edge.from,
      newNode,
      edge.stream.slice(1, edgeStreamIndex)
    );
    this._edges.add(fromEdge);

    const toEdge = this.createEdge(
      newNode,
      edge.to,
      edge.stream.slice(edgeStreamIndex + 1, -1)
    );
    this._edges.add(toEdge);
  }
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
