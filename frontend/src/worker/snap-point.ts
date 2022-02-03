import { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";
import { WORLD_ROADS } from "../constants/roads";
import { SnappedPoint } from "../types";

export async function snapPoint(
  point: LatLngTuple,
  worldSlug: WorldSlug
): Promise<SnappedPoint> {
  const roads = await WORLD_ROADS[worldSlug]();
  return roads.snapPoint(point);
}
