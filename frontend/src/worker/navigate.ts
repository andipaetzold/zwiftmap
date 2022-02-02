import type { LatLngTuple } from "leaflet";
import { WORLD_ROADS } from "../constants/roads";
import { findRoute } from "../services/navigation";
import { LatLngAlt } from "../types";
import { getWorld } from "../util/strava";

export async function navigate(
  from: LatLngTuple,
  to: LatLngTuple
): Promise<LatLngAlt[]> {
  const world = getWorld(from) ?? getWorld(to);
  if (!world) {
    throw new Error("Unknown world");
  }

  const roads = await WORLD_ROADS[world.slug]();
  const route = findRoute(from, to, roads);
  if (!route) {
    throw new Error("Could not find route");
  }
  return route;
}
