import { routes, segments, worlds } from ".";

const sprintSegmentSlugs = segments
  .filter((s) => s.type === "sprint")
  .map((s) => s.slug);
const worldSlugs = worlds.map((world) => world.slug);

describe("Verify routes", () => {
  routes.forEach((route) => {
    describe(route.name, () => {
      it("Sprint Slugs", () => {
        route.sprint.forEach((sprintSlug) => {
          expect(sprintSegmentSlugs).toContain(sprintSlug);
        });
      });
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
