import { WorldSlug } from "zwift-data";
import { WorldConfig } from "../../types";
import { WORLD_CONFIG_BOLOGNA } from "./bologna";
import { WORLD_CONFIG_CRIT_CITY } from "./critCity";
import { WORLD_CONFIG_FRANCE } from "./france";
import { WORLD_CONFIG_INNSBRUCK } from "./innsbruck";
import { WORLD_CONFIG_LONDON } from "./london";
import { WORLD_CONFIG_MAKURI_ISLANDS } from "./makuri-islands";
import { WORLD_CONFIG_NEW_YORK } from "./newYork";
import { WORLD_CONFIG_PARIS } from "./paris";
import { WORLD_CONFIG_RICHMOND } from "./richmond";
import { WORLD_CONFIG_SCOTLAND } from "./scotland";
import { WORLD_CONFIG_WATOPIA } from "./watopia";
import { WORLD_CONFIG_YORKSHIRE } from "./yorkshire";

export const worldConfigs: Record<WorldSlug, WorldConfig> = {
  bologna: WORLD_CONFIG_BOLOGNA,
  "crit-city": WORLD_CONFIG_CRIT_CITY,
  france: WORLD_CONFIG_FRANCE,
  innsbruck: WORLD_CONFIG_INNSBRUCK,
  london: WORLD_CONFIG_LONDON,
  "makuri-islands": WORLD_CONFIG_MAKURI_ISLANDS,
  "new-york": WORLD_CONFIG_NEW_YORK,
  paris: WORLD_CONFIG_PARIS,
  richmond: WORLD_CONFIG_RICHMOND,
  scotland: WORLD_CONFIG_SCOTLAND,
  watopia: WORLD_CONFIG_WATOPIA,
  yorkshire: WORLD_CONFIG_YORKSHIRE,
};
