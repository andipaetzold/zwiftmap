import { Roads } from "../../../services/Roads";
import edgeADZ from "./edges/adz";
import edgeADZTop from "./edges/adz-top";
import edgeEpic from "./edges/epic";
import edgeFuegoFlats from "./edges/fuego-flats";
import edgeFuegoNorthRoundabout1 from "./edges/fuego-north-roundabout-1";
import edgeFuegoNorthRoundabout2 from "./edges/fuego-north-roundabout-2";
import edgeFuegoSouthRoundabout1 from "./edges/fuego-south-roundabout-1";
import edgeFuegoSouthRoundabout2 from "./edges/fuego-south-roundabout-2";
import edgeMainBetweenEdges from "./edges/main-between-exits";
import edgeMainEast1 from "./edges/main-east-1";
import edgeMainEast2 from "./edges/main-east-2";
import edgeMainKOM1 from "./edges/main-kom-1";
import edgeMainKOM2 from "./edges/main-kom-2";
import edgeMainKOM3 from "./edges/main-kom-3";
import edgeMainKOMBypass from "./edges/main-kom-bypass";
import edgeMainJunction1 from "./edges/main-south-junction-1";
import edgeMainJunction2 from "./edges/main-south-junction-2";
import edgeMainJunction3 from "./edges/main-south-junction-3";
import edgeMainSouthWest from "./edges/main-south-west";
import edgeMainWest from "./edges/main-west";
import edgeMarina from "./edges/marina";
import edgeOceanBlvd from "./edges/ocean-blvd";
import edgeTitansGrove from "./edges/titans-grove";

const ROADS = new Roads();

// Alpe du Zwift
const ADZ_TOP = ROADS.createNode([-11.681593, 166.88947, 1046.8]);
const ADZ_BOTTOM_1 = ROADS.createNode([-11.686232, 166.925588, 8.2]);
const ADZ_BOTTOM_2 = ROADS.createNode([-11.686631, 166.925781, 8.2]);
const ADZ_BOTTOM_3 = ROADS.createNode([-11.686369, 166.926275, 8.2]);
ROADS.createEdge(ADZ_TOP, ADZ_TOP, edgeADZTop);
ROADS.createEdge(ADZ_BOTTOM_1, ADZ_TOP, edgeADZ);
ROADS.createEdge(ADZ_BOTTOM_2, ADZ_BOTTOM_1, []);
ROADS.createEdge(ADZ_BOTTOM_3, ADZ_BOTTOM_1, []);
ROADS.createEdge(ADZ_BOTTOM_2, ADZ_BOTTOM_3, []);

// Jungle (Junction Top)
const JUNGLE_JUNCTION_TOP_1 = ROADS.createNode([-11.681273, 166.927576, 0]);
const JUNGLE_JUNCTION_TOP_2 = ROADS.createNode([-11.681517, 166.927814, 0]);
const JUNGLE_JUNCTION_TOP_3 = ROADS.createNode([-11.681638, 166.927536, 0]);
ROADS.createEdge(JUNGLE_JUNCTION_TOP_1, JUNGLE_JUNCTION_TOP_2, []);
ROADS.createEdge(JUNGLE_JUNCTION_TOP_1, JUNGLE_JUNCTION_TOP_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_TOP_2, JUNGLE_JUNCTION_TOP_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_TOP_3, ADZ_BOTTOM_3, []);

// Jungle (Junction Bottom)
const JUNGLE_JUNCTION_BOTTOM_1 = ROADS.createNode([-11.684023, 166.930626, 0]);
const JUNGLE_JUNCTION_BOTTOM_2 = ROADS.createNode([-11.683957, 166.930311, 0]);
const JUNGLE_JUNCTION_BOTTOM_3 = ROADS.createNode([-11.684243, 166.930364, 0]);
ROADS.createEdge(JUNGLE_JUNCTION_BOTTOM_1, JUNGLE_JUNCTION_BOTTOM_2, []);
ROADS.createEdge(JUNGLE_JUNCTION_BOTTOM_1, JUNGLE_JUNCTION_BOTTOM_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_BOTTOM_2, JUNGLE_JUNCTION_BOTTOM_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_BOTTOM_2, JUNGLE_JUNCTION_TOP_2, []);
ROADS.createEdge(JUNGLE_JUNCTION_BOTTOM_3, ADZ_BOTTOM_2, []);

// Jungle (Junction Right)
const JUNGLE_JUNCTION_RIGHT_1 = ROADS.createNode([-11.678945, 166.93926, 0]);
const JUNGLE_JUNCTION_RIGHT_2 = ROADS.createNode([-11.678838, 166.93841, 0]);
const JUNGLE_JUNCTION_RIGHT_3 = ROADS.createNode([-11.679313, 166.938535, 0]);
ROADS.createEdge(JUNGLE_JUNCTION_RIGHT_1, JUNGLE_JUNCTION_RIGHT_2, []);
ROADS.createEdge(JUNGLE_JUNCTION_RIGHT_1, JUNGLE_JUNCTION_RIGHT_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_RIGHT_2, JUNGLE_JUNCTION_RIGHT_3, []);
ROADS.createEdge(JUNGLE_JUNCTION_RIGHT_2, JUNGLE_JUNCTION_TOP_1, []);
ROADS.createEdge(JUNGLE_JUNCTION_RIGHT_3, JUNGLE_JUNCTION_BOTTOM_3, []);

// Jungle (Start Pen)
const JUNGLE_PADDOCK_EXIT = ROADS.createNode([-11.667077, 166.943963, 0]);
const JUNGLE_PADDOCK_1 = ROADS.createNode([-11.665152, 166.943455, 0]);
const JUNGLE_PADDOCK_2 = ROADS.createNode([-11.666148, 166.94218, 0]);
const JUNGLE_PADDOCK_3 = ROADS.createNode([-11.664603, 166.943, 0]);
const JUNGLE_PADDOCK_4 = ROADS.createNode([-11.665623, 166.941698, 0]);
const JUNGLE_PADDOCK_CENTER = ROADS.createNode([-11.664944, 166.942271, 0]);
const JUNGLE_PADDOCK_ROW_FRONT = ROADS.createNode([-11.666222, 166.943264, 0]);
const JUNGLE_PADDOCK_ROW_BACK = ROADS.createNode([-11.66566, 166.942835, 0]);
ROADS.createEdge(JUNGLE_PADDOCK_1, JUNGLE_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(JUNGLE_PADDOCK_2, JUNGLE_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(JUNGLE_PADDOCK_ROW_BACK, JUNGLE_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(JUNGLE_PADDOCK_3, JUNGLE_PADDOCK_ROW_BACK, []);
ROADS.createEdge(JUNGLE_PADDOCK_4, JUNGLE_PADDOCK_ROW_BACK, []);
ROADS.createEdge(JUNGLE_PADDOCK_CENTER, JUNGLE_PADDOCK_ROW_BACK, []);
ROADS.createEdge(JUNGLE_PADDOCK_ROW_FRONT, JUNGLE_PADDOCK_EXIT, []);
ROADS.createEdge(JUNGLE_PADDOCK_EXIT, JUNGLE_JUNCTION_RIGHT_1, []);

// Radio Tower
const RADIO_TOWER_TOP = ROADS.createNode([-11.675184, 166.950624, 0]);
const RADIO_TOWER_BOTTOM = ROADS.createNode([-11.676543, 166.958332, 373.2]);
ROADS.createEdge(RADIO_TOWER_BOTTOM, RADIO_TOWER_TOP, []);
ROADS.createEdge(RADIO_TOWER_TOP, RADIO_TOWER_TOP, []);

// Epic KOM
const EPIC_KOM_WEST_JUNCTION_1 = ROADS.createNode([-11.664837, 166.950806, 0]);
const EPIC_KOM_WEST_JUNCTION_2 = ROADS.createNode([-11.665112, 166.95051, 0]);
const EPIC_KOM_WEST_JUNCTION_3 = ROADS.createNode([-11.665264, 166.950886, 0]);
ROADS.createEdge(EPIC_KOM_WEST_JUNCTION_1, EPIC_KOM_WEST_JUNCTION_2, []);
ROADS.createEdge(EPIC_KOM_WEST_JUNCTION_1, EPIC_KOM_WEST_JUNCTION_3, []);
ROADS.createEdge(EPIC_KOM_WEST_JUNCTION_2, EPIC_KOM_WEST_JUNCTION_3, []);
ROADS.createEdge(EPIC_KOM_WEST_JUNCTION_2, JUNGLE_PADDOCK_EXIT, []);

const EPIC_KOM_BYPASS_EAST = ROADS.createNode([-11.67363, 166.969279, 0]);
const EPIC_KOM_BYPASS_WEST = ROADS.createNode([-11.665455, 166.951225, 78.4]);
ROADS.createEdge(EPIC_KOM_WEST_JUNCTION_3, EPIC_KOM_BYPASS_WEST, []);
ROADS.createEdge(EPIC_KOM_BYPASS_WEST, EPIC_KOM_BYPASS_EAST, []);
ROADS.createEdge(EPIC_KOM_BYPASS_WEST, RADIO_TOWER_BOTTOM, edgeEpic);
ROADS.createEdge(EPIC_KOM_BYPASS_EAST, RADIO_TOWER_BOTTOM, []);

// Volcano
const VOLCANO_EAST = ROADS.createNode([-11.64014, 166.94246, 0]);
const VOLCANO_SOUTH = ROADS.createNode([-11.647332, 166.939304, 0]);
const VOLCANO_WEST = ROADS.createNode([-11.643755, 166.936158, 0]);
const VOLCANO_TOP = ROADS.createNode([-11.642471, 166.939379, 0]);
ROADS.createEdge(VOLCANO_TOP, VOLCANO_TOP, []);
ROADS.createEdge(VOLCANO_TOP, VOLCANO_WEST, []);
ROADS.createEdge(VOLCANO_EAST, VOLCANO_WEST, []);
ROADS.createEdge(VOLCANO_SOUTH, VOLCANO_WEST, []);
ROADS.createEdge(VOLCANO_SOUTH, VOLCANO_EAST, []);

// Ocean
const OCEAN_NORTH = ROADS.createNode([-11.636992, 166.959098, 0.6]);
const OCEAN_SOUTH = ROADS.createNode([-11.651355, 166.962536, -5.4]);
const OCEAN_WEST = ROADS.createNode([-11.653714, 166.955555, 1]);
const OCEAN_EAST = ROADS.createNode([-11.659781, 166.967565, 0]);
ROADS.createEdge(OCEAN_SOUTH, OCEAN_NORTH, edgeOceanBlvd);
ROADS.createEdge(OCEAN_SOUTH, OCEAN_WEST, []);
ROADS.createEdge(OCEAN_SOUTH, OCEAN_EAST, []);
ROADS.createEdge(OCEAN_WEST, EPIC_KOM_WEST_JUNCTION_1, []);
ROADS.createEdge(OCEAN_EAST, EPIC_KOM_BYPASS_EAST, []);

// Titans Grove
const TITANS_NORTH = ROADS.createNode([-11.636581, 166.969395, 11.8]);
const TITANS_SOUTH = ROADS.createNode([-11.659446, 166.976759, 28]);
ROADS.createEdge(TITANS_SOUTH, TITANS_NORTH, edgeTitansGrove);
ROADS.createEdge(TITANS_NORTH, OCEAN_NORTH, []);
ROADS.createEdge(TITANS_SOUTH, OCEAN_EAST, []);

// Main Paddock
const MAIN_PADDOCK_1 = ROADS.createNode([-11.635633, 166.95485, 0]);
const MAIN_PADDOCK_2 = ROADS.createNode([-11.634525, 166.954023, 0]);
const MAIN_PADDOCK_3 = ROADS.createNode([-11.63515, 166.955608, 0]);
const MAIN_PADDOCK_4 = ROADS.createNode([-11.634042, 166.954743, 0]);
const MAIN_PADDOCK_CENTER = ROADS.createNode([-11.634852, 166.954781, 0]);
const MAIN_PADDOCK_ROW_BACK = ROADS.createNode([-11.634995, 166.954594, 0]);
const MAIN_PADDOCK_ROW_FRONT = ROADS.createNode([-11.635481, 166.953907, 0]);
const MAIN_PADDOCK_SPLIT = ROADS.createNode([-11.635792, 166.953503, 0]);
const MAIN_PADDOCK_EXIT_WEST = ROADS.createNode([-11.635513, 166.952232, 1.6]);
const MAIN_PADDOCK_EXIT_EAST = ROADS.createNode([-11.637415, 166.95431, 1.8]);
ROADS.createEdge(MAIN_PADDOCK_CENTER, MAIN_PADDOCK_ROW_BACK, []);
ROADS.createEdge(MAIN_PADDOCK_ROW_BACK, MAIN_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(MAIN_PADDOCK_1, MAIN_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(MAIN_PADDOCK_2, MAIN_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(MAIN_PADDOCK_3, MAIN_PADDOCK_ROW_BACK, []);
ROADS.createEdge(MAIN_PADDOCK_4, MAIN_PADDOCK_ROW_BACK, []);
ROADS.createEdge(MAIN_PADDOCK_ROW_FRONT, MAIN_PADDOCK_SPLIT, []);
ROADS.createEdge(MAIN_PADDOCK_SPLIT, MAIN_PADDOCK_EXIT_WEST, []);
ROADS.createEdge(MAIN_PADDOCK_SPLIT, MAIN_PADDOCK_EXIT_EAST, []);
ROADS.createEdge(
  MAIN_PADDOCK_EXIT_WEST,
  MAIN_PADDOCK_EXIT_EAST,
  edgeMainBetweenEdges
);

// Main
const MAIN_KOM_BOTTOM = ROADS.createNode([-11.637252, 166.955531, 4.8]);
const MAIN_KOM_BYPASS_EAST = ROADS.createNode([-11.63934, 166.954774, 36.2]);
const MAIN_KOM_BYPASS_WEST = ROADS.createNode([-11.639125, 166.952824, 39.2]);
const MAIN_NORTH_WEST = ROADS.createNode([-11.640648, 166.94608, 13.2]);
const MAIN_SOUTH_WEST = ROADS.createNode([-11.650877, 166.948745, 10.8]);
const MAIN_SOUTH_JUNCTION_1 = ROADS.createNode([-11.647514, 166.951939, 13.6]);
const MAIN_SOUTH_JUNCTION_2 = ROADS.createNode([-11.648126, 166.952376, 15.8]);
const MAIN_SOUTH_JUNCTION_3 = ROADS.createNode([-11.648089, 166.952698, 15.4]);
ROADS.createEdge(MAIN_PADDOCK_EXIT_EAST, MAIN_KOM_BOTTOM, edgeMainEast1);
ROADS.createEdge(OCEAN_NORTH, MAIN_KOM_BOTTOM, edgeMainEast2);
ROADS.createEdge(MAIN_KOM_BOTTOM, MAIN_KOM_BYPASS_EAST, edgeMainKOM1);
ROADS.createEdge(MAIN_KOM_BYPASS_EAST, MAIN_KOM_BYPASS_WEST, edgeMainKOM2);
ROADS.createEdge(MAIN_KOM_BYPASS_EAST, MAIN_KOM_BYPASS_WEST, edgeMainKOMBypass);
ROADS.createEdge(MAIN_KOM_BYPASS_WEST, MAIN_SOUTH_JUNCTION_1, edgeMainKOM3);
ROADS.createEdge(MAIN_NORTH_WEST, VOLCANO_EAST, []);
ROADS.createEdge(MAIN_SOUTH_WEST, VOLCANO_SOUTH, []);
ROADS.createEdge(MAIN_NORTH_WEST, MAIN_PADDOCK_EXIT_WEST, []);
ROADS.createEdge(MAIN_SOUTH_WEST, MAIN_NORTH_WEST, edgeMainWest);
ROADS.createEdge(MAIN_SOUTH_JUNCTION_2, MAIN_SOUTH_WEST, edgeMainSouthWest);
ROADS.createEdge(
  MAIN_SOUTH_JUNCTION_1,
  MAIN_SOUTH_JUNCTION_2,
  edgeMainJunction1
);
ROADS.createEdge(
  MAIN_SOUTH_JUNCTION_1,
  MAIN_SOUTH_JUNCTION_3,
  edgeMainJunction3
);
ROADS.createEdge(
  MAIN_SOUTH_JUNCTION_2,
  MAIN_SOUTH_JUNCTION_3,
  edgeMainJunction2
);
ROADS.createEdge(MAIN_SOUTH_JUNCTION_3, OCEAN_WEST, edgeMarina);

// Fuego Flats
const FUEGO_SOUTH_1 = ROADS.createNode([-11.662318, 166.983305, 12.8]);
const FUEGO_SOUTH_2 = ROADS.createNode([-11.661783, 166.98417, 12.8]);
const FUEGO_NORTH_1 = ROADS.createNode([-11.638389, 166.977252, 15.6]);
const FUEGO_NORTH_2 = ROADS.createNode([-11.640373, 166.978375, 13.2]);
const FUEGO_PADDOCK_EXIT = ROADS.createNode([-11.635251, 166.973542, 0]);
const FUEGO_PADDOCK_1 = ROADS.createNode([-11.633471, 166.97375, 0]);
const FUEGO_PADDOCK_2 = ROADS.createNode([-11.633865, 166.972184, 0]);
const FUEGO_PADDOCK_3 = ROADS.createNode([-11.632762, 166.97353, 0]);
const FUEGO_PADDOCK_4 = ROADS.createNode([-11.633229, 166.972002, 0]);
const FUEGO_PADDOCK_CENTER = ROADS.createNode([-11.632581, 166.972666, 0]);
const FUEGO_PADDOCK_ROW_FRONT = ROADS.createNode([-11.634352, 166.97324, 0]);
const FUEGO_PADDOCK_ROW_BACK = ROADS.createNode([-11.633622, 166.973004, 0]);
ROADS.createEdge(FUEGO_SOUTH_1, FUEGO_SOUTH_2, edgeFuegoSouthRoundabout1);
ROADS.createEdge(FUEGO_SOUTH_2, FUEGO_SOUTH_1, edgeFuegoSouthRoundabout2);
ROADS.createEdge(FUEGO_SOUTH_1, TITANS_SOUTH, []);
ROADS.createEdge(FUEGO_SOUTH_2, FUEGO_NORTH_2, edgeFuegoFlats);
ROADS.createEdge(FUEGO_NORTH_2, FUEGO_NORTH_1, edgeFuegoNorthRoundabout1);
ROADS.createEdge(FUEGO_NORTH_1, FUEGO_NORTH_2, edgeFuegoNorthRoundabout2);
ROADS.createEdge(FUEGO_PADDOCK_EXIT, FUEGO_NORTH_1, []);
ROADS.createEdge(FUEGO_PADDOCK_EXIT, TITANS_NORTH, []);
ROADS.createEdge(FUEGO_PADDOCK_CENTER, FUEGO_PADDOCK_ROW_BACK, []);
ROADS.createEdge(FUEGO_PADDOCK_ROW_BACK, FUEGO_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(FUEGO_PADDOCK_ROW_FRONT, FUEGO_PADDOCK_EXIT, []);
ROADS.createEdge(FUEGO_PADDOCK_1, FUEGO_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(FUEGO_PADDOCK_2, FUEGO_PADDOCK_ROW_FRONT, []);
ROADS.createEdge(FUEGO_PADDOCK_3, FUEGO_PADDOCK_ROW_BACK, []);
ROADS.createEdge(FUEGO_PADDOCK_4, FUEGO_PADDOCK_ROW_BACK, []);

export default ROADS;
