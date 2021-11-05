import { worlds } from "zwift-data";

export const DEFAULT_WORLD = worlds.find((w) => w.slug === "watopia")!;
