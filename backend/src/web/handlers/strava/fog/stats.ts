import polyline from "@mapbox/polyline";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import buffer from "@turf/buffer";
import { lineString, point } from "@turf/helpers";
import length from "@turf/length";
import { Request, Response } from "express";
import { round, sum } from "lodash-es";
import { Record, String } from "runtypes";
import {
  readStravaFog,
  StravaFogStats,
  writeStravaFogStats,
} from "../../../../shared/persistence/index.js";
import { World, worlds } from "zwift-data";
import { latLngToPosition } from "../../../../shared/browser/coordinates.js";
import { WORLD_ROADS } from "../../../../shared/browser/roads/index.js";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/stravaActivity.js";
import { DetailedActivity } from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const BUFFER_RADIUS = 50;

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETStravaFogStats(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  const { stravaAthleteId } = session;

  const world = worlds.find((w) => w.slug === req.params.worldSlug)!;

  const stravaFog = await readStravaFog(stravaAthleteId, world.slug);
  let stats = stravaFog?.stats;
  if (!stats) {
    const activities = await readStravaActivitiesByWorld(
      stravaAthleteId,
      world.slug
    );

    stats = {
      activityDistance: getActivityDistance(activities),
      activityCount: activities.length,
      unlockedDistance: await getUnlockedDistance(world, activities),
    };

    await writeStravaFogStats(stravaAthleteId, world.slug, stats);
  }

  res.json({
    ...stats,
    worldDistance: await getWorldDistance(world),
  });
}

function getActivityDistance(activities: DetailedActivity[]) {
  return round(sum(activities.map((activity) => activity.distance)));
}

/**
 * TODO: precalculate this
 */
async function getWorldDistance(world: World) {
  const roads = await WORLD_ROADS[world.slug]();

  const distances = roads.edges
    .filter((e) => e.fog)
    .map((e) => [e.from.position, ...e.stream, e.to.position])
    .map((stream) => stream.map((p) => latLngToPosition([p[0], p[1]])))
    .map((stream) => lineString(stream))
    .map((stream) => length(stream, { units: "meters" }));

  return round(sum(distances));
}

async function getUnlockedDistance(
  world: World,
  activities: DetailedActivity[]
) {
  const coveredPolygons = activities
    .map((activity) => polyline.decode(activity.map.polyline))
    .map((stream) => stream.map(latLngToPosition))
    .map((stream) => lineString(stream))
    .map((line) => buffer(line, BUFFER_RADIUS, { units: "meters" }));

  const roads = await WORLD_ROADS[world.slug]();
  const edges = roads.edges
    .map((e) => [e.from.position, ...e.stream, e.to.position])
    .map((stream) => stream.map((p) => latLngToPosition([p[0], p[1]])));

  const coveredEdges: number[][][] = [[]];
  for (const edge of edges) {
    const edgeIsCovered = edge.map((p) =>
      coveredPolygons.some((polygon) =>
        booleanPointInPolygon(point(p), polygon)
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

  const coveredEdgeDistances = coveredEdges
    .filter((ce) => ce.length >= 2)
    .map((stream) => lineString(stream))
    .map((stream) => length(stream, { units: "meters" }));

  return round(sum(coveredEdgeDistances));
}
