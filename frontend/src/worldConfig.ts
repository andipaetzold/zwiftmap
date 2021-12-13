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
import {
  SurfaceType,
  SURFACE_TYPE_BRICK,
  SURFACE_TYPE_COBBLES,
  SURFACE_TYPE_WOOD,
} from "./types/Surface";

export type WorldConfig = {
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
  surfaces: {
    type: SurfaceType;
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
  surfaces: [
    {
      type: SURFACE_TYPE_BRICK,
      polygon: [
        [44.497632, 11.331145],
        [44.498027, 11.331479],
        [44.499294, 11.327853],
        [44.498899, 11.327512],
        [44.497632, 11.331145],
      ],
    },
  ],
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
      type: SURFACE_TYPE_BRICK,
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
      type: SURFACE_TYPE_COBBLES,
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
      type: SURFACE_TYPE_COBBLES,
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
      type: SURFACE_TYPE_COBBLES,
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
      type: SURFACE_TYPE_COBBLES,
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
      type: SURFACE_TYPE_BRICK,
      polygon: [
        [47.268528, 11.391566],
        [47.266103, 11.393669],
        [47.266198, 11.394292],
        [47.268761, 11.393283],
        [47.268528, 11.391566],
      ],
    },
    {
      type: SURFACE_TYPE_COBBLES,
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
  surfaces: [
    {
      // left entry from city 1
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [51.495266, -0.119761],
        [51.494742, -0.119898],
        [51.494619, -0.118964],
        [51.49512, -0.118789],
        [51.495266, -0.119761],
      ],
    },
    {
      // left entry from city 2
      type: SURFACE_TYPE_WOOD,
      polygon: [
        [51.49512, -0.118789],
        [51.494619, -0.118964],
        [51.494557, -0.117877],
        [51.495004, -0.117694],
        [51.49512, -0.118789],
      ],
    },
    {
      // left entry from city 3
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [51.495004, -0.117694],
        [51.494557, -0.117877],
        [51.49445, -0.117533],
        [51.4944, -0.116959],
        [51.494881, -0.116814],
        [51.495004, -0.117694],
      ],
    },
    {
      // left entry from city 4
      type: SURFACE_TYPE_WOOD,
      polygon: [
        [51.4944, -0.116959],
        [51.49445, -0.117533],
        [51.493666, -0.117672],
        [51.492642, -0.113203],
        [51.494539, -0.112387],
        [51.495046, -0.112108],
        [51.4944, -0.116959],
      ],
    },
    {
      // right exit towards city 1
      type: SURFACE_TYPE_WOOD,
      polygon: [
        [51.500737, -0.077306],
        [51.501247, -0.077063],
        [51.501341, -0.078034],
        [51.498716, -0.079264],
        [51.498753, -0.076364],
        [51.499585, -0.073389],
        [51.499575, -0.072721],
        [51.500321, -0.072311],
        [51.500737, -0.077306],
      ],
    },
    {
      // right exit towards city 2
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [51.501118, -0.076973],
        [51.500717, -0.077163],
        [51.500622, -0.076639],
        [51.501028, -0.076389],
        [51.501118, -0.076973],
      ],
    },
    {
      // right exit towards city 3
      type: SURFACE_TYPE_WOOD,
      polygon: [
        [51.501118, -0.076973],
        [51.501028, -0.076389],
        [51.501886, -0.075871],
        [51.502039, -0.076558],
        [51.501118, -0.076973],
      ],
    },
    {
      // right exit towards city 4
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [51.502039, -0.076558],
        [51.501886, -0.075871],
        [51.502409, -0.075603],
        [51.502524, -0.076191],
        [51.502039, -0.076558],
      ],
    },
  ],
};

const WORLD_CONFIG_MAKURI_ISLANDS: WorldConfig = {
  initialBounds: [
    [-10.743702, 165.829858],
    [-10.805634, 165.859212],
  ],
  image: makuriIslandsMap,
  backgroundColor: "#7d9a35",
  surfaces: [
    {
      // bridge in north dirt section
      type: "wood",
      polygon: [
        [-10.748951, 165.850969],
        [-10.749146, 165.850806],
        [-10.749386, 165.851079],
        [-10.749172, 165.851232],
        [-10.748951, 165.850969],
      ],
    },
    {
      // north dirt section, north
      type: "dirt",
      polygon: [
        [-10.746249, 165.846889],
        [-10.749283, 165.846502],
        [-10.751317, 165.848611],
        [-10.749146, 165.850806],
        [-10.748951, 165.850969],
        [-10.746197, 165.847086],
        [-10.746249, 165.846889],
      ],
    },
    {
      // north dirt section, south
      type: "dirt",
      polygon: [
        [-10.749386, 165.851079],
        [-10.750785, 165.852002],
        [-10.750769, 165.852324],
        [-10.748983, 165.852646],
        [-10.749001, 165.851849],
        [-10.749001, 165.851849],
        [-10.749172, 165.851232],
        [-10.749386, 165.851079],
      ],
    },
    {
      // bridge from north dirt section to castle
      type: "wood",
      polygon: [
        [-10.752914, 165.849929],
        [-10.753236, 165.849687],
        [-10.753386, 165.84987],
        [-10.753035, 165.850124],
        [-10.752914, 165.849929],
      ],
    },
    {
      // bridge in between lakes
      type: "wood",
      polygon: [
        [-10.766464, 165.840568],
        [-10.766598, 165.840884],
        [-10.766353, 165.840975],
        [-10.766213, 165.840648],
        [-10.766464, 165.840568],
      ],
    },
    {
      // south of bridge between lakes
      type: "dirt",
      polygon: [
        [-10.766598, 165.840884],
        [-10.768977, 165.841404],
        [-10.768981, 165.841639],
        [-10.766917, 165.842375],
        [-10.766353, 165.840975],
        [-10.766598, 165.840884],
      ],
    },
    {
      // top of bridge between lakes
      type: "dirt",
      polygon: [
        [-10.759389, 165.838407],
        [-10.767096, 165.836116],
        [-10.767133, 165.839074],
        [-10.766464, 165.840568],
        [-10.766213, 165.840648],
        [-10.75933, 165.838802],
        [-10.759389, 165.838407],
      ],
    },
    {
      // bridge left of entry to temple KOM from fishing village side
      type: "wood",
      polygon: [
        [-10.747467, 165.853989],
        [-10.747728, 165.853952],
        [-10.747813, 165.854373],
        [-10.747546, 165.854424],
        [-10.747467, 165.853989],
      ],
    },
    {
      // bridge between temple KOMs west
      type: "wood",
      polygon: [
        [-10.754775, 165.852056],
        [-10.755001, 165.85205],
        [-10.755001, 165.852249],
        [-10.754775, 165.852265],
        [-10.754775, 165.852056],
      ],
    },
    {
      // road between two bridges between temple KOMs
      type: "dirt",
      polygon: [
        [-10.752938, 165.854083],
        [-10.752756, 165.853246],
        [-10.754474, 165.851921],
        [-10.754775, 165.852056],
        [-10.754775, 165.852265],
        [-10.754385, 165.853024],
        [-10.753188, 165.854172],
        [-10.752938, 165.854083],
      ],
    },
    {
      // bridge between temple KOMs east
      type: "wood",
      polygon: [
        [-10.752938, 165.854083],
        [-10.753188, 165.854172],
        [-10.753072, 165.85452],
        [-10.752809, 165.854424],
        [-10.752938, 165.854083],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "dirt",
      polygon: [
        [-10.753072, 165.85452],
        [-10.756108, 165.8575],
        [-10.7557, 165.859054],
        [-10.755704, 165.859327],
        [-10.749275, 165.858762],
        [-10.747922, 165.854927],
        [-10.74787, 165.854707],
        [-10.74919, 165.85377],
        [-10.752809, 165.854424],
        [-10.753072, 165.85452],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "wood",
      polygon: [
        [-10.7557, 165.859054],
        [-10.756244, 165.859062],
        [-10.756237, 165.859338],
        [-10.755704, 165.859327],
        [-10.7557, 165.859054],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "dirt",
      polygon: [
        [-10.756244, 165.859062],
        [-10.756259, 165.858955],
        [-10.756516, 165.858936],
        [-10.75654, 165.859279],
        [-10.756237, 165.859338],
        [-10.756244, 165.859062],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "wood",
      polygon: [
        [-10.756244, 165.858542],
        [-10.756509, 165.858534],
        [-10.756516, 165.858936],
        [-10.756259, 165.858955],
        [-10.756244, 165.858542],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "dirt",
      polygon: [
        [-10.756244, 165.858542],
        [-10.75615, 165.857892],
        [-10.759001, 165.856653],
        [-10.759453, 165.857233],
        [-10.759464, 165.85751],
        [-10.759054, 165.859115],
        [-10.756509, 165.858534],
        [-10.756244, 165.858542],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "wood",
      polygon: [
        [-10.759453, 165.857233],
        [-10.759993, 165.857025],
        [-10.760179, 165.857252],
        [-10.759553, 165.857666],
        [-10.759464, 165.85751],
        [-10.759453, 165.857233],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "dirt",
      polygon: [
        [-10.759993, 165.857025],
        [-10.760045, 165.856516],
        [-10.760321, 165.856556],
        [-10.760179, 165.857252],
        [-10.759993, 165.857025],
      ],
    },
    {
      // temple KOM from fishing village side
      type: "wood",
      polygon: [
        [-10.760045, 165.856516],
        [-10.760037, 165.856181],
        [-10.760229, 165.855824],
        [-10.760714, 165.855698],
        [-10.760843, 165.855937],
        [-10.760321, 165.856556],
        [-10.760045, 165.856516],
      ],
    },
    {
      // temple KOM arc
      type: "dirt",
      polygon: [
        [-10.760714, 165.855698],
        [-10.761431, 165.855242],
        [-10.76157, 165.855459],
        [-10.760843, 165.855937],
        [-10.760714, 165.855698],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.761431, 165.855242],
        [-10.761876, 165.854558],
        [-10.761981, 165.854333],
        [-10.762269, 165.854609],
        [-10.762429, 165.855014],
        [-10.76157, 165.855459],
        [-10.761431, 165.855242],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.761702, 165.854349],
        [-10.761981, 165.854333],
        [-10.761876, 165.854558],
        [-10.761808, 165.854588],
        [-10.761702, 165.854349],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.761288, 165.85437],
        [-10.761702, 165.854349],
        [-10.761808, 165.854588],
        [-10.761481, 165.854807],
        [-10.761252, 165.854625],
        [-10.761288, 165.85437],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.760756, 165.854384],
        [-10.760941, 165.85429],
        [-10.761288, 165.85437],
        [-10.761252, 165.854625],
        [-10.760941, 165.854577],
        [-10.760756, 165.854384],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.760756, 165.854384],
        [-10.760941, 165.854577],
        [-10.76064, 165.854888],
        [-10.760443, 165.854716],
        [-10.760756, 165.854384],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.760342, 165.854829],
        [-10.760443, 165.854716],
        [-10.76064, 165.854888],
        [-10.76054, 165.855006],
        [-10.760342, 165.854829],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.760342, 165.854829],
        [-10.76054, 165.855006],
        [-10.760142, 165.855593],
        [-10.759918, 165.855497],
        [-10.760013, 165.855073],
        [-10.760342, 165.854829],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.759821, 165.855553],
        [-10.759918, 165.855497],
        [-10.760142, 165.855593],
        [-10.760037, 165.855891],
        [-10.759734, 165.855795],
        [-10.759821, 165.855553],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.759671, 165.854832],
        [-10.759831, 165.855204],
        [-10.759821, 165.855553],
        [-10.759734, 165.855795],
        [-10.759383, 165.855577],
        [-10.759444, 165.854966],
        [-10.759671, 165.854832],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.759508, 165.854608],
        [-10.759671, 165.854832],
        [-10.759444, 165.854966],
        [-10.759304, 165.85479],
        [-10.759508, 165.854608],
      ],
    },
    {
      // temple KOM from castle side
      type: "wood",
      polygon: [
        [-10.759251, 165.854077],
        [-10.759523, 165.854309],
        [-10.759508, 165.854608],
        [-10.759304, 165.85479],
        [-10.759095, 165.854278],
        [-10.759251, 165.854077],
      ],
    },
    {
      // temple KOM from castle side
      type: "dirt",
      polygon: [
        [-10.757884, 165.849226],
        [-10.758063, 165.8494],
        [-10.759251, 165.854077],
        [-10.759095, 165.854278],
        [-10.758502, 165.856046],
        [-10.756527, 165.855955],
        [-10.755001, 165.852249],
        [-10.755001, 165.85205],
        [-10.75693, 165.849734],
        [-10.757884, 165.849226],
      ],
    },
    {
      // bridge north north east
      type: "wood",
      polygon: [
        [-10.743775, 165.854529],
        [-10.744047, 165.854525],
        [-10.744077, 165.855359],
        [-10.743804, 165.855363],
        [-10.743775, 165.854529],
      ],
    },
    {
      // bridge north east
      type: "wood",
      polygon: [
        [-10.744826, 165.856888],
        [-10.746555, 165.856926],
        [-10.746771, 165.857089],
        [-10.746398, 165.857908],
        [-10.74449, 165.857404],
        [-10.744639, 165.857051],
        [-10.744826, 165.856888],
      ],
    },
    {
      // bridge towards castle
      type: "wood",
      polygon: [
        [-10.758761, 165.844682],
        [-10.758962, 165.844666],
        [-10.759012, 165.845184],
        [-10.758756, 165.845235],
        [-10.758761, 165.844682],
      ],
    },
    {
      // castle
      type: "cobbles",
      polygon: [
        [-10.761046, 165.845591],
        [-10.76093, 165.845844],
        [-10.759354, 165.846348],
        [-10.759449, 165.847142],
        [-10.759486, 165.847324],
        [-10.758464, 165.848086],
        [-10.757489, 165.847228],
        [-10.756508, 165.847474],
        [-10.756319, 165.847228],
        [-10.7583, 165.845629],
        [-10.758754, 165.846015],
        [-10.759286, 165.845854],
        [-10.759955, 165.845747],
        [-10.76035, 165.845532],
        [-10.761046, 165.845591],
      ],
    },
    {
      // before tunnel to neokyo
      type: "dirt",
      polygon: [
        [-10.775143, 165.83004],
        [-10.776087,165.829273],
        [-10.776845, 165.829911],
        [-10.776793, 165.830158],
        [-10.775249, 165.830222],
        [-10.775143, 165.83004],
      ],
    },
  ],
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
      // whole world
      type: SURFACE_TYPE_COBBLES,
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
  surfaces: [
    {
      // top left
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [37.552037, -77.457716],
        [37.552969, -77.456601],
        [37.560331, -77.466994],
        [37.557636, -77.469665],
        [37.552258, -77.458398],
        [37.552037, -77.457716],
      ],
    },
    {
      // KOM
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [37.527933, -77.419275],
        [37.527265, -77.418585],
        [37.526495, -77.417553],
        [37.527067, -77.416833],
        [37.527464, -77.417485],
        [37.527662, -77.417273],
        [37.528059, -77.417804],
        [37.528486, -77.418464],
        [37.527933, -77.419275],
      ],
    },
    {
      // 23rd street
      type: SURFACE_TYPE_COBBLES,
      polygon: [
        [37.531275, -77.422526],
        [37.530939, -77.421834],
        [37.531777, -77.421024],
        [37.532084, -77.421673],
        [37.531275, -77.422526],
      ],
    },
  ],
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
