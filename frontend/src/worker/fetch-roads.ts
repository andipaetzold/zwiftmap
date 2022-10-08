import { WorldSlug } from "zwift-data";
import { WORLD_ROADS } from "../shared/roads";

export async function fetchRoads(worldSlug: WorldSlug): Promise<void> {
  await WORLD_ROADS[worldSlug]();
}
