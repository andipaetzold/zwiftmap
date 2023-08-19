import type { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";
import { findRoute, WORLD_ROADS } from "../shared/roads";
import { LatLngAlt } from "../types";

export async function navigate(
  from: LatLngTuple,
  to: LatLngTuple,
  worldSlug: WorldSlug,
): Promise<LatLngAlt[]> {
  const roads = await WORLD_ROADS[worldSlug]();
  const route = findRoute(from, to, roads);
  if (!route) {
    throw new Error("Could not find route");
  }
  return route;
}
