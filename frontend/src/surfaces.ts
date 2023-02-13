import { routes, worlds } from "zwift-data";
import { readFileSync, writeFileSync } from "fs";
import { worldConfigs } from "./constants";
import { getSurfaceStats, getSurfaceStream } from "./util/surface";
import { SURFACE_TYPES } from "./types";

const rows = [["World", "Route", ...SURFACE_TYPES]];

for (const route of routes) {
  if (!route.stravaSegmentId) {
    continue;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const world = worlds.find((w) => w.slug === route.world)!;
  const worldConfig = worldConfigs[route.world];

  const distanceStream = JSON.parse(
    readFileSync(
      `public/strava-segments/${route.stravaSegmentId}/distance.json`,
      { encoding: "utf-8" }
    )
  );
  const latLngStream = JSON.parse(
    readFileSync(
      `public/strava-segments/${route.stravaSegmentId}/latlng.json`,
      { encoding: "utf-8" }
    )
  );

  const surfaceStream = getSurfaceStream(latLngStream, worldConfig.surfaces);
  const stats = getSurfaceStats(distanceStream, surfaceStream);

  rows.push([
    world.name,
    route.name,
    ...SURFACE_TYPES.map((type) => stats[type].toString()),
  ]);
}

writeFileSync("route-surfaces.csv", rows.map((row) => row.join(",")).join("\n"));
