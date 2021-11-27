import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { routes, worlds } from "zwift-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITEMAP_PATH = path.resolve(__dirname, "../public/sitemap.txt");

const DOMAIN = "https://zwiftmap.com";

const urls = [DOMAIN, `${DOMAIN}?list=events`];

for (const world of worlds) {
  urls.push(`${DOMAIN}/${world.slug}`);
}

for (const route of routes) {
  urls.push(`${DOMAIN}/${route.world}/${route.slug}`);
}

const content = urls.join("\n");
writeFileSync(SITEMAP_PATH, content);
