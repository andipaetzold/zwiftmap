import { WorldSlug } from "zwift-data";
import { Roads } from "../../services/Roads";
import bologna from "./bologna";
import critCity from "./crit-city";
import france from "./france";
import innsbruck from "./innsbruck";
import london from "./london";
import makuriIslands from "./makuri-islands";
import newYork from "./new-york";
import paris from "./paris";
import richmond from "./richmond";
import watopia from "./watopia";
import yorkshire from "./yorkshire";

export const WORLD_ROADS: Record<WorldSlug, () => Promise<Roads>> = {
  bologna: () => Promise.resolve(bologna),
  "crit-city": () => Promise.resolve(critCity),
  france: () => Promise.resolve(france),
  innsbruck: () => Promise.resolve(innsbruck),
  london: () => Promise.resolve(london),
  "makuri-islands": () => Promise.resolve(makuriIslands),
  "new-york": () => Promise.resolve(newYork),
  paris: () => Promise.resolve(paris),
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
