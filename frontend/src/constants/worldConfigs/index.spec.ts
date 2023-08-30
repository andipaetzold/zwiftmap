import { describe, expect, it } from "vitest";
import { worldConfigs } from ".";

describe("ensure bounds are topleft and bottomright", () => {
  describe("initial bounds", () => {
    Object.entries(worldConfigs).forEach(([worldSlug, worldConfig]) => {
      it(worldSlug, () => {
        expect(worldConfig.initialBounds[0][0]).toBeGreaterThanOrEqual(
          worldConfig.initialBounds[1][0],
        );
        expect(worldConfig.initialBounds[0][1]).toBeLessThanOrEqual(
          worldConfig.initialBounds[1][1],
        );
      });
    });
  });
});
