import { routes, segments, worlds } from ".";

const worldSlugs = worlds.map((world) => world.slug);

describe("Verify routes", () => {
  routes.forEach((route) => {
    describe(route.name, () => {
      it("World slug", () => {
        expect(worldSlugs).toContain(route.world);
      });
    });
  });
});

describe("Verify segments", () => {
  segments.forEach((segment) => {
    describe(segment.name, () => {
      it("World slug", () => {
        expect(worldSlugs).toContain(segment.world);
      });
    });
  });
});
