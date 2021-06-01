const fetch = require("node-fetch");
const { writeFileSync, mkdirSync, existsSync } = require("fs");
const { routes, segments } = require("zwift-data");

const BASE_DIR = `${__dirname}/../public`;

async function main() {
  await Promise.all([
    ...routes
      .filter((route) => route.stravaSegmentId !== undefined)
      .map((route) => fetchSegment(route, "routes")),
    ...segments
      .filter((segment) => segment.stravaSegmentId !== undefined)
      .map((segment) => fetchSegment(segment, "segments")),
  ]);
}

if (!existsSync(BASE_DIR)) {
  mkdirSync(BASE_DIR);
}
main();

async function fetchSegment({ name, slug, stravaSegmentId }, type) {
  const response = await fetch(
    `https://www.strava.com/stream/segments/${stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
  );
  const stravaData = await response.json();

  const segmentDir = `${BASE_DIR}/${type}/${slug}`;
  if (!existsSync(segmentDir)) {
    mkdirSync(segmentDir, { recursive: true });
  }

  writeFileSync(
    `${segmentDir}/altitude.json`,
    JSON.stringify(stravaData.altitude)
  );
  writeFileSync(
    `${segmentDir}/distance.json`,
    JSON.stringify(stravaData.distance)
  );
  writeFileSync(`${segmentDir}/latlng.json`, JSON.stringify(stravaData.latlng));

  console.log(name);
}
