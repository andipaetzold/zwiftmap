import { WorldSlug } from "zwift-data";
import { Roads } from "../../services/Roads";

export const WORLD_ROADS: Record<WorldSlug, null | (() => Promise<Roads>)> = {
  bologna: null,
  "crit-city": () => import("./crit-city").then((m) => m.default),
  france: null,
  innsbruck: null,
  london: null,
  "makuri-islands": null,
  "new-york": null,
  paris: () => import("./paris").then((m) => m.default),
  richmond: null,
  watopia: null,
  yorkshire: null,
};
