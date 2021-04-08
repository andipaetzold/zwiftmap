const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const routes = require("../src/routes.json");

async function main() {
  for (const route of routes.filter(route => route.stravaSegmentId !== undefined)) {
    const response = await fetch(
      `https://www.strava.com/stream/segments/${route.stravaSegmentId}?streams%5B%5D=latlng`
    );
    const stravaData = await response.json();

    console.log(route.name);
    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: stravaData.latlng.map((p) => [p[1], p[0]]),
      },
    };
    writeFileSync(
      `${__dirname}/../public/routes/${route.slug}.geojson`,
      JSON.stringify(geojson)
    );
  }
}

main();
