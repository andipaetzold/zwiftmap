import { WorldSlug } from "zwift-data";
import { Roads } from "../../services/Roads";

export const WORLD_ROADS: Record<WorldSlug, null | (() => Promise<Roads>)> = {
  bologna: () => import("./bologna").then((m) => m.default),
  "crit-city": () => import("./crit-city").then((m) => m.default),
  france: () => import("./france").then((m) => m.default),
  innsbruck: () => import("./innsbruck").then((m) => m.default),
  london: () => import("./london").then((m) => m.default),
  "makuri-islands": () => import("./makuri-islands").then((m) => m.default),
  "new-york": () => import("./new-york").then((m) => m.default),
  paris: () => import("./paris").then((m) => m.default),
  richmond: () => import("./richmond").then((m) => m.default),
  watopia: () => import("./watopia").then((m) => m.default),
  yorkshire: () => import("./yorkshire").then((m) => m.default),
};
