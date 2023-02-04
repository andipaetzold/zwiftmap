import { WorldSlug } from "zwift-data";
import bologna from "./bologna/index.js";
import critCity from "./crit-city/index.js";
import france from "./france/index.js";
import innsbruck from "./innsbruck/index.js";
import london from "./london/index.js";
import makuriIslands from "./makuri-islands/index.js";
import newYork from "./new-york/index.js";
import paris from "./paris/index.js";
import richmond from "./richmond/index.js";
import scotland from "./scotland/index.js";
import { Roads } from "./Roads.js";
import watopia from "./watopia/index.js";
import yorkshire from "./yorkshire/index.js";
export * from "./Roads.js";

export const WORLD_ROADS: Record<WorldSlug, () => Promise<Roads>> = {
  bologna: () => Promise.resolve(bologna),
  "crit-city": () => Promise.resolve(critCity),
  france: () => Promise.resolve(france),
  innsbruck: () => Promise.resolve(innsbruck),
  london: () => Promise.resolve(london),
  "makuri-islands": () => Promise.resolve(makuriIslands),
  "new-york": () => Promise.resolve(newYork),
  paris: () => Promise.resolve(paris),
  scotland: () => Promise.resolve(scotland),
  richmond: () => Promise.resolve(richmond),
  watopia: () => Promise.resolve(watopia),
  yorkshire: () => Promise.resolve(yorkshire),

  // Vite issue: https://github.com/vitejs/vite/issues/6847

  // bologna: () => import("./bologna").then((m) => m.default),
  // "crit-city": () => import("./crit-city").then((m) => m.default),
  // france: () => import("./france").then((m) => m.default),
  // innsbruck: () => import("./innsbruck").then((m) => m.default),
  // london: () => import("./london").then((m) => m.default),
  // "makuri-islands": () => import("./makuri-islands").then((m) => m.default),
  // "new-york": () => import("./new-york").then((m) => m.default),
  // paris: () => import("./paris").then((m) => m.default),
  // richmond: () => import("./richmond").then((m) => m.default),
  // watopia: () => import("./watopia").then((m) => m.default),
  // yorkshire: () => import("./yorkshire").then((m) => m.default),
};
