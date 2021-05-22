import { worldConfigs } from "./worldConfig";

describe("ensure bounds are topleft and bottomright", () => {
  describe("initial bounds", () => {
    Object.entries(worldConfigs).forEach(([worldSlug, worldConfig]) => {
      it(worldSlug, () => {
        expect(worldConfig.initialBounds[0][0]).toBeGreaterThanOrEqual(
          worldConfig.initialBounds[1][0]
        );
        expect(worldConfig.initialBounds[0][1]).toBeLessThanOrEqual(
          worldConfig.initialBounds[1][1]
        );
      });
    });
  });

  describe("image bounds", () => {
    Object.entries(worldConfigs).forEach(([worldSlug, worldConfig]) => {
      it(worldSlug, () => {
        expect(worldConfig.imageBounds[0][0]).toBeGreaterThanOrEqual(
          worldConfig.imageBounds[1][0]
        );
        expect(worldConfig.imageBounds[0][1]).toBeLessThanOrEqual(
          worldConfig.imageBounds[1][1]
        );
      });
    });
  });
});
