const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const routes = require("../src/data/routes.json");

async function main() {
  for (const route of routes.filter(route => route.stravaSegmentId !== undefined)) {
    const response = await fetch(
      `https://www.strava.com/stream/segments/${route.stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
    );
    const stravaData = await response.json();

    console.log(route.name);
    writeFileSync(
      `${__dirname}/../public/segments/${route.slug}.json`,
      JSON.stringify(stravaData)
    );
  }
}

main();
