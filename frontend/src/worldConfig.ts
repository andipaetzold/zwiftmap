import { LatLngTuple } from "leaflet";
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
import { WorldSlug } from "./types";

export type WorldConfig = {
  imageBounds: [LatLngTuple, LatLngTuple];
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
};

export const worldConfigs: Record<WorldSlug, WorldConfig> = {
  bologna: {
    imageBounds: [
      [44.45463821, 11.26261748],
      [44.5308037, 11.36991729102076],
    ],
    initialBounds: [
      [44.478222, 11.294653],
      [44.501423, 11.341099],
    ],
    image: bolognaMap,
    backgroundColor: "#b9b9b8",
  },
  "crit-city": {
    imageBounds: [
      [-10.3657, 165.7824],
      [-10.4038, 165.8207],
    ],
    initialBounds: [
      [-10.382352, 165.798758],
      [-10.386016, 165.803496],
    ],
    image: critCityMap,
    backgroundColor: "#7c9938",
  },
  france: {
    imageBounds: [
      [-21.64155, 166.1384],
      [-21.7564, 166.26125],
    ],
    initialBounds: [
      [-21.697812, 166.148225],
      [-21.744906, 166.202642],
    ],
    image: franceMap,
    backgroundColor: "#6f992d",
  },
  innsbruck: {
    imageBounds: [
      [47.2947, 11.3501],
      [47.2055, 11.4822],
    ],
    initialBounds: [
      [47.280902, 11.386414],
      [47.214544, 11.445934],
    ],
    image: innsbruckMap,
    backgroundColor: "#7c9938",
  },
  london: {
    imageBounds: [
      [51.5362, -0.1776],
      [51.4601, -0.0555],
    ],
    initialBounds: [
      [51.511261, -0.134875],
      [51.489256, -0.072996],
    ],
    image: londonMap,
    backgroundColor: "#6f992d",
  },
  "makuri-islands": {
    imageBounds: [
      [-10.73746, 165.80468],
      [-10.81405, 165.88222],
    ],
    initialBounds: [
      [-10.743702, 165.859212],
      [-10.775156, 165.830083],
    ],
    image: makuriIslandsMap,
    backgroundColor: "#7c9938",
  },
  "new-york": {
    imageBounds: [
      [40.81725, -74.0227],
      [40.74085, -73.9222],
    ],
    initialBounds: [
      [40.799618, -73.982068],
      [40.763547, -73.949602],
    ],
    image: newYorkMap,
    backgroundColor: "#bbbbb7",
  },
  paris: {
    imageBounds: [
      [48.9058, 2.2561],
      [48.82945, 2.3722],
    ],
    initialBounds: [
      [48.874328, 2.294207],
      [48.860895, 2.331992],
    ],
    image: parisMap,
    backgroundColor: "#b9b9b9",
  },
  richmond: {
    imageBounds: [
      [37.5774, -77.48954],
      [37.5014, -77.394],
    ],
    initialBounds: [
      [37.558393, -77.467668],
      [37.520429, -77.415864],
    ],
    image: richmondMap,
    backgroundColor: "#7c9938",
  },
  watopia: {
    imageBounds: [
      [-11.62597, 166.87747],
      [-11.70255, 167.03255],
    ],
    initialBounds: [
      [-11.635444, 166.93555],
      [-11.673613, 166.972511],
    ],
    image: watopiaMap,
    backgroundColor: "#0884e2",
  },
  yorkshire: {
    imageBounds: [
      [54.0254, -1.632],
      [53.9491, -1.5022],
    ],
    initialBounds: [
      [53.999691, -1.592961],
      [53.974875, -1.539474],
    ],
    image: yorkshireMap,
    backgroundColor: "#7c9938",
  },
};
