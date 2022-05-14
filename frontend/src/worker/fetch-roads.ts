import { WORLD_ROADS } from "@zwiftmap/roads";
import { WorldSlug } from "zwift-data";

export async function fetchRoads(worldSlug: WorldSlug): Promise<void> {
  await WORLD_ROADS[worldSlug]();
}
