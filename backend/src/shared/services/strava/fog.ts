import polyline from "@mapbox/polyline";
import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import { Feature, lineString, MultiPolygon, Polygon } from "@turf/helpers";
import { World } from "zwift-data";
import { latLngToPosition } from "../../browser/coordinates.js";
import { DetailedActivity } from "./api-types/index.js";

const BUFFER_RADIUS = 0.05; // 50 m

export function calcFogPolygon(world: World, activities: DetailedActivity[]) {
  const boundsPolygon = bboxPolygon([
    world.bounds[0][1] - 1,
    world.bounds[0][0] + 1,
    world.bounds[1][1] + 1,
    world.bounds[1][0] - 1,
  ]);

  return activities
    .map((activity) => polyline.decode(activity.map.polyline))
    .map((stream) => stream.map(latLngToPosition))
    .map((stream) => lineString(stream))
    .map((line) => buffer(line, BUFFER_RADIUS, { units: "kilometers" }))
    .reduce((prev, cur) => {
      try {
        // Activities can never cover the whole map
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return difference(prev, cur)!;
      } catch (e) {
        return prev;
      }
    }, boundsPolygon as Feature<Polygon | MultiPolygon>);
}
