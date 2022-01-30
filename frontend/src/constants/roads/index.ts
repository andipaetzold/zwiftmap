import { WorldSlug } from "zwift-data";
import { Roads } from "../../services/Roads";

export const WORLD_ROADS: Record<WorldSlug, null | (() => Promise<Roads>)> = {
  bologna: null,
  "crit-city": null,
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
