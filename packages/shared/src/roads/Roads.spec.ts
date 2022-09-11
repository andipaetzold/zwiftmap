import { describe, expect, it } from "vitest";
import { Roads } from "./Roads";

describe("splitEdge", () => {
  it("start", () => {
    const roads = new Roads();

    const left = roads.createNode([0, 0, 0]);
    const right = roads.createNode([5, 0, 0]);
    const edge = roads.createEdge(left, right, [[3, 0, 0]]);

    roads.splitEdge({
      edge,
      edgeStreamIndex: 0,
      sourcePosition: [2, 0],
      position: [2, 0, 0],
    });

    const leftMatcher = expect.objectContaining({ position: [0, 0, 0] });
    const rightMatcher = expect.objectContaining({ position: [5, 0, 0] });
    const newMatcher = expect.objectContaining({ position: [2, 0, 0] });

    expect(roads.nodes).toHaveLength(3);
    expect(roads.nodes).toContainEqual(leftMatcher);
    expect(roads.nodes).toContainEqual(newMatcher);
    expect(roads.nodes).toContainEqual(rightMatcher);

    expect(roads.edges).toHaveLength(2);
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: leftMatcher,
        to: newMatcher,
        stream: [
          [0, 0, 0],
          [2, 0, 0],
        ],
      })
    );
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: newMatcher,
        to: rightMatcher,
        stream: [
          [2, 0, 0],
          [3, 0, 0],
          [5, 0, 0],
        ],
      })
    );
  });

  it("end", () => {
    const roads = new Roads();

    const left = roads.createNode([0, 0, 0]);
    const right = roads.createNode([5, 0, 0]);
    const edge = roads.createEdge(left, right, [[2, 0, 0]]);

    roads.splitEdge({
      edge,
      edgeStreamIndex: 2,
      sourcePosition: [4, 0],
      position: [4, 0, 0],
    });

    const leftMatcher = expect.objectContaining({ position: [0, 0, 0] });
    const rightMatcher = expect.objectContaining({ position: [5, 0, 0] });
    const newMatcher = expect.objectContaining({ position: [4, 0, 0] });

    expect(roads.nodes).toHaveLength(3);
    expect(roads.nodes).toContainEqual(leftMatcher);
    expect(roads.nodes).toContainEqual(newMatcher);
    expect(roads.nodes).toContainEqual(rightMatcher);

    expect(roads.edges).toHaveLength(2);
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: leftMatcher,
        to: newMatcher,
        stream: [
          [0, 0, 0],
          [2, 0, 0],
          [4, 0, 0],
        ],
      })
    );
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: newMatcher,
        to: rightMatcher,
        stream: [
          [4, 0, 0],
          [5, 0, 0],
        ],
      })
    );
  });

  it("middle left", () => {
    const roads = new Roads();

    const left = roads.createNode([0, 0, 0]);
    const right = roads.createNode([5, 0, 0]);
    const edge = roads.createEdge(left, right, [[4, 0, 0]]);

    roads.splitEdge({
      edge,
      edgeStreamIndex: 1,
      sourcePosition: [2, 0],
      position: [2, 0, 0],
    });

    const leftMatcher = expect.objectContaining({ position: [0, 0, 0] });
    const rightMatcher = expect.objectContaining({ position: [5, 0, 0] });
    const newMatcher = expect.objectContaining({ position: [2, 0, 0] });

    expect(roads.nodes).toHaveLength(3);
    expect(roads.nodes).toContainEqual(leftMatcher);
    expect(roads.nodes).toContainEqual(newMatcher);
    expect(roads.nodes).toContainEqual(rightMatcher);

    expect(roads.edges).toHaveLength(2);
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: leftMatcher,
        to: newMatcher,
        stream: [
          [0, 0, 0],
          [2, 0, 0],
        ],
      })
    );
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: newMatcher,
        to: rightMatcher,
        stream: [
          [2, 0, 0],
          [4, 0, 0],
          [5, 0, 0],
        ],
      })
    );
  });

  it("middle right", () => {
    const roads = new Roads();

    const left = roads.createNode([0, 0, 0]);
    const right = roads.createNode([5, 0, 0]);
    const edge = roads.createEdge(left, right, [[2, 0, 0]]);

    roads.splitEdge({
      edge,
      edgeStreamIndex: 1,
      sourcePosition: [4, 0],
      position: [4, 0, 0],
    });

    const leftMatcher = expect.objectContaining({ position: [0, 0, 0] });
    const rightMatcher = expect.objectContaining({ position: [5, 0, 0] });
    const newMatcher = expect.objectContaining({ position: [4, 0, 0] });

    expect(roads.nodes).toHaveLength(3);
    expect(roads.nodes).toContainEqual(leftMatcher);
    expect(roads.nodes).toContainEqual(newMatcher);
    expect(roads.nodes).toContainEqual(rightMatcher);

    expect(roads.edges).toHaveLength(2);
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: leftMatcher,
        to: newMatcher,
        stream: [
          [0, 0, 0],
          [2, 0, 0],
          [4, 0, 0],
        ],
      })
    );
    expect(roads.edges).toContainEqual(
      expect.objectContaining({
        from: newMatcher,
        to: rightMatcher,
        stream: [
          [4, 0, 0],
          [5, 0, 0],
        ],
      })
    );
  });
});
