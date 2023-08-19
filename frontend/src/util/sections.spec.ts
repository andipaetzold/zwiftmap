import identity from "lodash-es/identity";
import range from "lodash-es/range";
import { getSectionsFromIntervals } from "./sections";
import { describe, expect, it } from "vitest";

describe("getSectionsFromIntervals", () => {
  it("returns single section if no intervals are passed", () => {
    const stream = range(0, 10);
    const result = getSectionsFromIntervals(stream, [], identity);

    expect(result.length).toBe(1);
    expect(result[0].start).toBe(0);
    expect(result[0].end).toBe(9);
    expect(result[0].stream).toStrictEqual(stream);
    expect(result[0].ref).toBeUndefined();
  });

  it("returns sections for interval at end", () => {
    const stream = range(0, 10);
    const result = getSectionsFromIntervals(stream, [[5, 9]], identity);

    expect(result.length).toBe(2);

    expect(result[0].start).toBe(0);
    expect(result[0].end).toBe(5);
    expect(result[0].stream).toStrictEqual(range(0, 6));
    expect(result[0].ref).toBeUndefined();

    expect(result[1].start).toBe(5);
    expect(result[1].end).toBe(9);
    expect(result[1].stream).toStrictEqual(range(5, 10));
    expect(result[1].ref).toStrictEqual([5, 9]);
  });

  it("returns sections for interval at start", () => {
    const stream = range(0, 10);
    const result = getSectionsFromIntervals(stream, [[0, 5]], identity);

    expect(result.length).toBe(2);

    expect(result[0].start).toBe(0);
    expect(result[0].end).toBe(5);
    expect(result[0].stream).toStrictEqual(range(0, 6));
    expect(result[0].ref).toStrictEqual([0, 5]);

    expect(result[1].start).toBe(5);
    expect(result[1].end).toBe(9);
    expect(result[1].stream).toStrictEqual(range(5, 10));
    expect(result[1].ref).toBeUndefined();
  });

  it("returns sections for interval in middle", () => {
    const stream = range(0, 10);
    const result = getSectionsFromIntervals(stream, [[4, 8]], identity);

    expect(result.length).toBe(3);

    expect(result[0].start).toBe(0);
    expect(result[0].end).toBe(4);
    expect(result[0].stream).toStrictEqual(range(0, 5));
    expect(result[0].ref).toBeUndefined();

    expect(result[1].start).toBe(4);
    expect(result[1].end).toBe(8);
    expect(result[1].stream).toStrictEqual(range(4, 9));
    expect(result[1].ref).toStrictEqual([4, 8]);

    expect(result[2].start).toBe(8);
    expect(result[2].end).toBe(9);
    expect(result[2].stream).toStrictEqual(range(8, 10));
    expect(result[2].ref).toBeUndefined();
  });

  it("returns sections for multiple intervals", () => {
    const stream = range(0, 10);
    const result = getSectionsFromIntervals(
      stream,
      [
        [2, 3],
        [5, 8],
      ],
      identity,
    );

    expect(result.length).toBe(5);

    expect(result[0].start).toBe(0);
    expect(result[0].end).toBe(2);
    expect(result[0].stream).toStrictEqual(range(0, 3));
    expect(result[0].ref).toBeUndefined();

    expect(result[1].start).toBe(2);
    expect(result[1].end).toBe(3);
    expect(result[1].stream).toStrictEqual(range(2, 4));
    expect(result[1].ref).toStrictEqual([2, 3]);

    expect(result[2].start).toBe(3);
    expect(result[2].end).toBe(5);
    expect(result[2].stream).toStrictEqual(range(3, 6));
    expect(result[2].ref).toBeUndefined();

    expect(result[3].start).toBe(5);
    expect(result[3].end).toBe(8);
    expect(result[3].stream).toStrictEqual(range(5, 9));
    expect(result[3].ref).toStrictEqual([5, 8]);

    expect(result[4].start).toBe(8);
    expect(result[4].end).toBe(9);
    expect(result[4].stream).toStrictEqual(range(8, 10));
    expect(result[4].ref).toBeUndefined();
  });
});
