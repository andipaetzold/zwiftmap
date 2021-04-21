import { routes, segments, worlds } from ".";

describe("Worlds", () => {
  it("Unique ids", () => {
    const worldIds = worlds.map((w) => w.id).filter((id) => id !== undefined);
    expect(new Set(worldIds).size).toBe(worldIds.length);
  });

  it("Unique slugs", () => {
    const worldSlugs = worlds.map((world) => world.slug);
    expect(new Set(worldSlugs).size).toBe(worldSlugs.length);
  });
});

describe("Routes", () => {
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
        const worldSlugs = worlds.map((world) => world.slug);
        expect(worldSlugs).toContain(route.world);
      });

      it("Segments exists", () => {
        const segmentSlugs = segments.map((segment) => segment.slug);

        route.segments.forEach((s) => {
          expect(segmentSlugs).toContain(s);
        });
      });
    });
  });
});

describe("Segments", () => {
  it("Unique slugs", () => {
    expect(new Set(segments.map((s) => s.slug)).size).toBe(segments.length);
  });

  segments.forEach((segment) => {
    describe(segment.name, () => {
      const worldSlugs = worlds.map((w) => w.slug);
      it("World slug", () => {
        expect(worldSlugs).toContain(segment.world);
      });
    });
  });
});
