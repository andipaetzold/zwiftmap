const fetch = require("node-fetch");
const { writeFileSync, mkdirSync } = require("fs");
const routes = require("../src/data/routes.json");
const segments = require("../src/data/segments.json");
const { existsSync } = require("node:fs");

const BASE_DIR = `${__dirname}/../public/segments`;

async function main() {
  await Promise.all([
    ...routes
      .filter((route) => route.stravaSegmentId !== undefined)
      .map((route) => fetchSegment(route)),
    ...segments
      .filter((segment) => segment.stravaSegmentId !== undefined)
      .map((segment) => fetchSegment(segment)),
  ]);
}

if (!existsSync(BASE_DIR)) {
  mkdirSync(BASE_DIR);
}
main();

async function fetchSegment({ name, slug, stravaSegmentId }) {
  const response = await fetch(
    `https://www.strava.com/stream/segments/${stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
  );
  const stravaData = await response.json();

  const segmentDir = `${BASE_DIR}/${slug}`;
  mkdirSync(segmentDir);

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
