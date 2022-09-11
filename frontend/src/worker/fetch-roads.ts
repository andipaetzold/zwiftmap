import { WORLD_ROADS } from "@zwiftmap/shared";
import { WorldSlug } from "zwift-data";

export async function fetchRoads(worldSlug: WorldSlug): Promise<void> {
  await WORLD_ROADS[worldSlug]();
}
