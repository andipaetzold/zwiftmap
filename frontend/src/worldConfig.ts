import { LatLngTuple } from "leaflet";
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
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
};

export const worldConfigs: Record<WorldSlug, WorldConfig> = {
  bologna: {
    initialBounds: [
      [44.501423, 11.294653],
      [44.478222, 11.341099],
    ],
    image: bolognaMap,
    backgroundColor: "#b9b9b8",
  },
  "crit-city": {
    initialBounds: [
      [-10.382352, 165.798758],
      [-10.386016, 165.803496],
    ],
    image: critCityMap,
    backgroundColor: "#7c9938",
  },
  france: {
    initialBounds: [
      [-21.697812, 166.148225],
      [-21.744906, 166.202642],
    ],
    image: franceMap,
    backgroundColor: "#6f992d",
  },
  innsbruck: {
    initialBounds: [
      [47.280902, 11.386414],
      [47.214544, 11.445934],
    ],
    image: innsbruckMap,
    backgroundColor: "#7c9938",
  },
  london: {
    initialBounds: [
      [51.511261, -0.134875],
      [51.489256, -0.072996],
    ],
    image: londonMap,
    backgroundColor: "#6f992d",
  },
  "makuri-islands": {
    initialBounds: [
      [-10.743702, 165.829858],
      [-10.805634, 165.859212],
    ],
    image: makuriIslandsMap,
    backgroundColor: "#7d9a35",
  },
  "new-york": {
    initialBounds: [
      [40.799618, -73.982068],
      [40.763547, -73.949602],
    ],
    image: newYorkMap,
    backgroundColor: "#bbbbb7",
  },
  paris: {
    initialBounds: [
      [48.874328, 2.294207],
      [48.860895, 2.331992],
    ],
    image: parisMap,
    backgroundColor: "#b9b9b9",
  },
  richmond: {
    initialBounds: [
      [37.558393, -77.467668],
      [37.520429, -77.415864],
    ],
    image: richmondMap,
    backgroundColor: "#7c9938",
  },
  watopia: {
    initialBounds: [
      [-11.635444, 166.93555],
      [-11.673613, 166.972511],
    ],
    image: watopiaMap,
    backgroundColor: "#0884e2",
  },
  yorkshire: {
    initialBounds: [
      [53.999691, -1.592961],
      [53.974875, -1.539474],
    ],
    image: yorkshireMap,
    backgroundColor: "#7c9938",
  },
};
