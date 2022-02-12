import fromPairs from "lodash-es/fromPairs";
import { World, worlds, WorldSlug } from "zwift-data";

// @ts-ignore
export const WORLDS_BY_SLUG: Record<WorldSlug, World> = fromPairs(
  worlds.map((world) => [world.slug, world])
);
