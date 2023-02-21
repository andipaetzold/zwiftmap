import { lineString } from "@turf/helpers";
import length from "@turf/length";
import { Request, Response } from "express";
import { round, sum } from "lodash-es";
import { Record, String } from "runtypes";
import { World, worlds } from "zwift-data";
import { latLngToPosition } from "../../../../shared/browser/coordinates.js";
import { WORLD_ROADS } from "../../../../shared/browser/roads/index.js";
import {
  readStravaFog,
  writeStravaFogStats,
} from "../../../../shared/persistence/index.js";
import { readStravaActivitiesByWorld } from "../../../../shared/persistence/stravaActivity.js";
import {
  calcCoveredEdges,
  DetailedActivity,
} from "../../../../shared/services/strava/index.js";
import { Session } from "../../../types.js";

const RADIUS = 50;

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
  const coveredEdges = await calcCoveredEdges(world, activities);
  const coveredEdgeDistances = coveredEdges
    .map((stream) => lineString(stream))
    .map((stream) => length(stream, { units: "meters" }));

  return round(sum(coveredEdgeDistances));
}
