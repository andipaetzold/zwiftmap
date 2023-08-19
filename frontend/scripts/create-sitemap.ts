import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { routes, segments, worlds } from "zwift-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITEMAP_PATH = path.resolve(__dirname, "../public/sitemap.txt");

const DOMAIN = "https://zwiftmap.com";

const urls = [DOMAIN, `${DOMAIN}?list=events`];

for (const world of worlds) {
  urls.push(`${DOMAIN}/${world.slug}`);
  urls.push(`${DOMAIN}/${world.slug}/custom-route`);
  urls.push(`${DOMAIN}/${world.slug}/fog`);
  urls.push(`${DOMAIN}/${world.slug}?list=events`);
  urls.push(`${DOMAIN}/${world.slug}?list=strava-activities`);
}

for (const route of routes.filter(
  (route) => route.stravaSegmentId !== undefined,
)) {
  urls.push(`${DOMAIN}/${route.world}/${route.slug}`);
}

for (const segment of segments.filter(
  (segment) => segment.stravaSegmentId !== undefined,
)) {
  urls.push(`${DOMAIN}/${segment.world}/${segment.slug}`);
}

const content = urls.join("\n");
writeFileSync(SITEMAP_PATH, content);
