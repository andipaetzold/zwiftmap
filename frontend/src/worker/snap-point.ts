import { SnappedPoint, WORLD_ROADS } from "@zwiftmap/roads";
import { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";

export async function snapPoint(
  point: LatLngTuple,
  worldSlug: WorldSlug
): Promise<SnappedPoint> {
  const roads = await WORLD_ROADS[worldSlug]();
  return roads.snapPoint(point);
}
