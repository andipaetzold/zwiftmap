import { expect, it } from "vitest";
import bologna from "./bologna";
import critCity from "./crit-city";
import france from "./france";
import innsbruck from "./innsbruck";
import london from "./london";
import makuriIslands from "./makuri-islands";
import newYork from "./new-york";
import paris from "./paris";
import richmond from "./richmond";
import watopia from "./watopia";
import yorkshire from "./yorkshire";

(
  [
    ["Bologna", bologna],
    ["Crit City", critCity],
    ["France", france],
    ["Innsbruck", innsbruck],
    ["London", london],
    ["Makuri Islands", makuriIslands],
    ["New York", newYork],
    ["Paris", paris],
    ["Richmond", richmond],
    ["Watopia", watopia],
    ["Yorkshire", yorkshire],
  ] as const
).forEach(([name, roads]) => {
  it(`${name} has no jumps in altitudes`, () => {
    for (const edge of roads.edges) {
      for (let i = 0; i < edge.stream.length - 1; ++i) {
        const diff = edge.stream[i][2] - edge.stream[i + 1][2];
        expect(diff).toBeGreaterThanOrEqual(-5);
        expect(diff).toBeLessThanOrEqual(5);
      }
    }
  });
});
