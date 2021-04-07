const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const routes = require("../src/routes.json");

async function main() {
  for (const route of routes.filter(route => route.stravaid > 1)) {
    const response = await fetch(
      `https://www.strava.com/stream/segments/${route.stravaid}?streams%5B%5D=latlng`
    );
    const stravaData = await response.json();

    console.log(route.route);
    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: stravaData.latlng.map((p) => [p[1], p[0]]),
      },
    };
    writeFileSync(
      `${__dirname}/../public/segments/${route.routeid}.geojson`,
      JSON.stringify(geojson)
    );
  }
}

main();
