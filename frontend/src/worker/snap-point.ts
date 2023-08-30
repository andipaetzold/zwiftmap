import { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";
import { SnappedPoint, WORLD_ROADS } from "../shared/roads";

export async function snapPoint(
  point: LatLngTuple,
  worldSlug: WorldSlug,
): Promise<SnappedPoint> {
  const roads = await WORLD_ROADS[worldSlug]();
  return roads.snapPoint(point);
}
