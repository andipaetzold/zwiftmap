import polyline from "@mapbox/polyline";
import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import { Feature, lineString, MultiPolygon, Polygon } from "@turf/helpers";
import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { config } from "../../../shared/config.js";
import { SummaryActivity } from "strava";
import { World, worlds } from "zwift-data";
import { latLngToPosition } from "../../../shared/browser/coordinates.js";
import { CachedStravaUserAPI } from "../../../shared/services/strava/index.js";
import { getWorld, isZwiftActivity } from "../../../shared/util.js";
import { Session } from "../../types.js";

const PER_PAGE = 200;

const MONTH_IN_SECONDS = 6 * 30 * 24 * 60 * 60;
const NOW = new Date().getTime() / 1_000;

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint((worldSlug) => slugs.includes(worldSlug)),
});

export async function handleGETWorldFog(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;
  if (!session.stravaAthleteId) {
    res.sendStatus(403);
    return;
  }

  if (!config.strava.betaUsers.includes(session.stravaAthleteId)) {
    res.sendStatus(403);
    return;
  }

  const world = worlds.find((w) => w.slug === req.params.worldSlug)!;

  const activities = await getActivities(session.stravaAthleteId);
  const fog = calcFog(world, activities);

  res.contentType("application/geo+json").json(fog);
}

async function getActivities(athleteId: number) {
  let page = 1;
  const activities: SummaryActivity[] = [];
  let newActivities: SummaryActivity[];

  const api = new CachedStravaUserAPI(athleteId);
  do {
    newActivities = await api.getActivities({
      after: NOW - MONTH_IN_SECONDS,
      page,
      per_page: PER_PAGE,
    });
    activities.push(...newActivities);
    ++page;
  } while (newActivities.length === PER_PAGE);

  return activities.filter(isZwiftActivity);
}

const BUFFER_RADIUS = 0.05; // 50 m

function calcFog(world: World, activities: SummaryActivity[]) {
  const boundsPolygon = bboxPolygon([
    world.bounds[0][1] - 1,
    world.bounds[0][0] + 1,
    world.bounds[1][1] + 1,
    world.bounds[1][0] - 1,
  ]);

  return activities
    .filter((activity) => getWorld(activity)?.id === world?.id)
    .map((activity) => polyline.decode(activity.map.summary_polyline))
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
