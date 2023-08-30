import fromPairs from "lodash-es/fromPairs";
import { World, worlds, WorldSlug } from "zwift-data";

// @ts-expect-error Strange types by `fromPairs`
export const WORLDS_BY_SLUG: Record<WorldSlug, World> = fromPairs(
  worlds.map((world) => [world.slug, world]),
);
