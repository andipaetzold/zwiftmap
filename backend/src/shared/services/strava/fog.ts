import polyline from "@mapbox/polyline";
import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import {
  Feature,
  lineString,
  MultiPolygon,
  point,
  Polygon,
} from "@turf/helpers";
import pointToLineDistance from "@turf/point-to-line-distance";
import { World } from "zwift-data";
import { latLngToPosition } from "../../browser/coordinates.js";
import { WORLD_ROADS } from "../../browser/roads/index.js";
import { DetailedActivity } from "./api-types/index.js";

const RADIUS = 50;

export async function calcCoveredEdges(
  world: World,
  activities: DetailedActivity[]
) {
  const activityLines = activities
    .map((activity) => polyline.decode(activity.map.polyline))
    .map((stream) => stream.map(latLngToPosition))
    .map((stream) => lineString(stream));

  const roads = await WORLD_ROADS[world.slug]();
  const edges = roads.edges
    .filter((e) => e.fog)
    .map((e) => [e.from.position, ...e.stream, e.to.position])
    .map((stream) => stream.map((p) => latLngToPosition([p[0], p[1]])));

  const coveredEdges: number[][][] = [[]];
  for (const edge of edges) {
    const edgeIsCovered = edge.map((p) =>
      activityLines.some(
        (line) =>
          pointToLineDistance(point(p), line, { units: "meters" }) <= RADIUS
      )
    );
    for (let i = 0; i < edge.length; ++i) {
      if (edgeIsCovered[i]) {
        coveredEdges.at(-1)!.push(edge[i]);
      } else {
        coveredEdges.push([]);
      }
    }
    coveredEdges.push([]);
  }

  return coveredEdges.filter((ce) => ce.length >= 2);
}

export async function calcFogPolygon(
  world: World,
  activities: DetailedActivity[]
) {
  const boundsPolygon = bboxPolygon([
    world.bounds[0][1] - 1,
    world.bounds[0][0] + 1,
    world.bounds[1][1] + 1,
    world.bounds[1][0] - 1,
  ]);

  const coveredEdges = await calcCoveredEdges(world, activities);

  return coveredEdges
    .map((stream) => lineString(stream))
    .map((line) => buffer(line, RADIUS, { units: "meters" }))
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
