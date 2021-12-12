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
import { Surface, SURFACE_BRICK, SURFACE_COBBLES } from "./types/Surface";

export type WorldConfig = {
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
  surfaces: {
    surface: Surface;
    polygon: LatLngTuple[];
  }[];
};

const WORLD_CONFIG_BOLOGNA: WorldConfig = {
  initialBounds: [
    [44.501423, 11.294653],
    [44.478222, 11.341099],
  ],
  image: bolognaMap,
  backgroundColor: "#b9b9b8",
  surfaces: [],
};

const WORLD_CONFIG_CRIT_CITY: WorldConfig = {
  initialBounds: [
    [-10.382352, 165.798758],
    [-10.386016, 165.803496],
  ],
  image: critCityMap,
  backgroundColor: "#7c9938",
  surfaces: [
    {
      surface: SURFACE_BRICK,
      polygon: [
        [-10.385806, 165.799698],
        [-10.385804, 165.80094],
        [-10.385142, 165.800938],
        [-10.385152, 165.799701],
        [-10.385806, 165.799698],
      ],
    },
  ],
};

const WORLD_CONFIG_FRANCE: WorldConfig = {
  initialBounds: [
    [-21.697812, 166.148225],
    [-21.744906, 166.202642],
  ],
  image: franceMap,
  backgroundColor: "#6f992d",
  surfaces: [
    {
      // bridge near start
      surface: SURFACE_COBBLES,
      polygon: [
        [-21.73782, 166.178963],
        [-21.737471, 166.17981],
        [-21.737053, 166.179531],
        [-21.737362, 166.178802],
        [-21.73782, 166.178963],
      ],
    },
    {
      // pave sprint
      surface: SURFACE_COBBLES,
      polygon: [
        [-21.699664, 166.174865],
        [-21.699065, 166.175366],
        [-21.697458, 166.17265],
        [-21.698966, 166.169729],
        [-21.699622, 166.170245],
        [-21.699664, 166.174865],
      ],
    },
    {
      // bridge to bottom-left island, from top
      surface: SURFACE_COBBLES,
      polygon: [
        [-21.73742, 166.15294],
        [-21.734989, 166.153593],
        [-21.734848, 166.152895],
        [-21.737201, 166.152318],
        [-21.73742, 166.15294],
      ],
    },
    {
      // bridge to bottom-left island, from right
      surface: SURFACE_COBBLES,
      polygon: [
        [-21.743226, 166.157136],
        [-21.742007, 166.158805],
        [-21.741592, 166.15838],
        [-21.742782, 166.156764],
        [-21.743226, 166.157136],
      ],
    },
  ],
};

const WORLD_CONFIG_INNSBRUCK: WorldConfig = {
  initialBounds: [
    [47.280902, 11.386414],
    [47.214544, 11.445934],
  ],
  image: innsbruckMap,
  backgroundColor: "#7c9938",
  surfaces: [
    {
      surface: SURFACE_BRICK,
      polygon: [
        [47.268528, 11.391566],
        [47.266103, 11.393669],
        [47.266198, 11.394292],
        [47.268761, 11.393283],
        [47.268528, 11.391566],
      ],
    },
    {
      surface: SURFACE_COBBLES,
      polygon: [
        [47.266103, 11.393669],
        [47.264146, 11.394469],
        [47.264116, 11.395296],
        [47.266198, 11.394292],
        [47.266103, 11.393669],
      ],
    },
  ],
};

const WORLD_CONFIG_LONDON: WorldConfig = {
  initialBounds: [
    [51.511261, -0.134875],
    [51.489256, -0.072996],
  ],
  image: londonMap,
  backgroundColor: "#6f992d",
  surfaces: [],
};

const WORLD_CONFIG_MAKURI_ISLANDS: WorldConfig = {
  initialBounds: [
    [-10.743702, 165.829858],
    [-10.805634, 165.859212],
  ],
  image: makuriIslandsMap,
  backgroundColor: "#7d9a35",
  surfaces: [],
};

const WORLD_CONFIG_NEW_YORK: WorldConfig = {
  initialBounds: [
    [40.799618, -73.982068],
    [40.763547, -73.949602],
  ],
  image: newYorkMap,
  backgroundColor: "#bbbbb7",
  surfaces: [],
};

const WORLD_CONFIG_PARIS: WorldConfig = {
  initialBounds: [
    [48.874328, 2.294207],
    [48.860895, 2.331992],
  ],
  image: parisMap,
  backgroundColor: "#b9b9b9",
  surfaces: [
    {
      surface: SURFACE_COBBLES,
      polygon: [
        [48.9058, 2.2561],
        [48.9058, 2.3722],
        [48.82945, 2.3722],
        [48.82945, 2.2561],
        [48.9058, 2.2561],
      ],
    },
  ],
};

const WORLD_CONFIG_RICHMOND: WorldConfig = {
  initialBounds: [
    [37.558393, -77.467668],
    [37.520429, -77.415864],
  ],
  image: richmondMap,
  backgroundColor: "#7c9938",
  surfaces: [],
};

const WORLD_CONFIG_WATOPIA: WorldConfig = {
  initialBounds: [
    [-11.635444, 166.93555],
    [-11.673613, 166.972511],
  ],
  image: watopiaMap,
  backgroundColor: "#0884e2",
  surfaces: [],
};

const WORLD_CONFIG_YORKSHIRE: WorldConfig = {
  initialBounds: [
    [53.999691, -1.592961],
    [53.974875, -1.539474],
  ],
  image: yorkshireMap,
  backgroundColor: "#7c9938",
  surfaces: [],
};

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
  watopia: WORLD_CONFIG_WATOPIA,
  yorkshire: WORLD_CONFIG_YORKSHIRE,
};
