import { WorldSlug } from "zwift-data";
import bolognaMap from "./maps/bologna.png";
import critCityMap from "./maps/crit-city.png";
import franceMap from "./maps/france.png";
import innsbruckMap from "./maps/innsbruck.png";
import londonMap from "./maps/london.png";
import makuriIslandsMap from "./maps/makuri-islands.png";
import newYorkMap from "./maps/new-york.png";
import parisMap from "./maps/paris.png";
import richmondMap from "./maps/richmond.png";
import watopiaMap from "./maps/watopia.png";
import yorkshireMap from "./maps/yorkshire.png";

export type WorldConfig = {
  image: string;
  backgroundColor: string;
};

export const worldConfigs: Record<WorldSlug, WorldConfig> = {
  bologna: {
    image: bolognaMap,
    backgroundColor: "#b9b9b8",
  },
  "crit-city": {
    image: critCityMap,
    backgroundColor: "#7c9938",
  },
  france: {
    image: franceMap,
    backgroundColor: "#6f992d",
  },
  innsbruck: {
    image: innsbruckMap,
    backgroundColor: "#7c9938",
  },
  london: {
    image: londonMap,
    backgroundColor: "#6f992d",
  },
  "makuri-islands": {
    image: makuriIslandsMap,
    backgroundColor: "#7d9a35",
  },
  "new-york": {
    image: newYorkMap,
    backgroundColor: "#bbbbb7",
  },
  paris: {
    image: parisMap,
    backgroundColor: "#b9b9b9",
  },
  richmond: {
    image: richmondMap,
    backgroundColor: "#7c9938",
  },
  watopia: {
    image: watopiaMap,
    backgroundColor: "#0884e2",
  },
  yorkshire: {
    image: yorkshireMap,
    backgroundColor: "#7c9938",
  },
};
