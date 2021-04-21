import { routes, segments, worlds } from ".";

const worldSlugs = worlds.map((world) => world.slug);

describe("Verify routes", () => {
  it("Unique ids", () => {
    const routeIds = routes.map((r) => r.id).filter((id) => id !== undefined);
    expect(new Set(routeIds).size).toBe(routeIds.length);
  });

  it("Unique slugs", () => {
    const routeSlugs = routes.map((r) => r.slug);
    expect(new Set(routeSlugs).size).toBe(routeSlugs.length);
  });

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
