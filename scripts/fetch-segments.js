const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const routes = require("../src/data/routes.json");
const segments = require("../src/data/segments.json");

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

main();

async function fetchSegment({ name, slug, stravaSegmentId }) {
  const response = await fetch(
    `https://www.strava.com/stream/segments/${stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
  );
  const stravaData = await response.json();

  writeFileSync(
    `${__dirname}/../public/segments/${slug}.json`,
    JSON.stringify(stravaData)
  );
  console.log(name);
}
