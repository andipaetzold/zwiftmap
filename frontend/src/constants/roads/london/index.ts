import { Roads } from "../../../services/Roads";
import boxHill from "./edges/box-hill";
import edgeBridgeNorth from "./edges/bridge-north";
import edgeBridgeSouth from "./edges/bridge-south";
import cityBridgeToNorth from "./edges/city-bridge-to-north";
import edgeCityEast from "./edges/city-east";
import cityMall from "./edges/city-mall";
import cityRoundabout1To2 from "./edges/city-roundabout-1-to-2";
import cityRoundabout1To3 from "./edges/city-roundabout-1-to-3";
import cityRoundabout1To6 from "./edges/city-roundabout-1-to-6";
import cityRoundabout2To5 from "./edges/city-roundabout-2-to-5";
import cityRoundabout3To5 from "./edges/city-roundabout-3-to-5";
import cityRoundabout4To6 from "./edges/city-roundabout-4-to-6";
import cityRoundabout5To6 from "./edges/city-roundabout-5-to-6";
import cityRoundaboutEast from "./edges/city-roundabout-east";
import citySouthToRoundabout from "./edges/city-south-to-roundabout";
import hillBridgeToRoundabout from "./edges/hill-bridge-to-roundabout";
import hillBypass from "./edges/hill-bypass";
import hillEastConnector from "./edges/hill-east-connector";
import hillRoundaboutEast from "./edges/hill-roundabout-east";
import hillRoundaboutToBox from "./edges/hill-roundabout-to-box";
import hillRoundaboutWest from "./edges/hill-roundabout-west";
import keithHill from "./edges/keith-hill";
import edgeNorth from "./edges/north";
import paddockExits from "./edges/paddock-exits";

const ROADS = new Roads();

// Paddock
const PADDOCK_SPLIT = ROADS.createNode([51.510293, -0.076103, 18]);
const PADDOCK_EXIT_EAST = ROADS.createNode([51.50976, -0.074885, 18.6]);
const PADDOCK_EXIT_WEST = ROADS.createNode([51.509418, -0.076892, 18]);
const PADDOCK_ROW_FRONT = ROADS.createNode([51.511349, -0.076165, 18]);
const PADDOCK_ROW_BACK = ROADS.createNode([51.512052, -0.07621, 18]);
const PADDOCK_1 = ROADS.createNode([51.512066, -0.07511, 18]);
const PADDOCK_2 = ROADS.createNode([51.512057, -0.077424, 18]);
const PADDOCK_3 = ROADS.createNode([51.512586, -0.075308, 18]);
const PADDOCK_4 = ROADS.createNode([51.512609, -0.07728, 18]);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_SPLIT, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_SPLIT, PADDOCK_EXIT_EAST, [])
ROADS.createEdge(PADDOCK_SPLIT, PADDOCK_EXIT_WEST, [])
ROADS.createEdge(PADDOCK_EXIT_EAST, PADDOCK_EXIT_WEST, paddockExits)

// Hills
const HILLS_WEST = ROADS.createNode([51.499308, -0.110976, 22]);
const HILLS_BRIDGE_SOUTH = ROADS.createNode([51.494467, -0.111343, 5.4]);
const HILLS_BRIDGE_NORTH = ROADS.createNode([51.498256, -0.076069, 11]);
const HILLS_EAST_JUNCTION_1 = ROADS.createNode([51.496338, -0.073113, 26.2]);
const HILLS_EAST_JUNCTION_2 = ROADS.createNode([51.496017, -0.073456, 28]);
const HILLS_EAST_JUNCTION_3 = ROADS.createNode([51.496044, -0.072727, 26.6]);
const HILLS_ROUNDABOUT_1 = ROADS.createNode([51.495602, -0.111053, 3.6]);
const HILLS_ROUNDABOUT_2 = ROADS.createNode([51.495942, -0.110363, 4.4]);
ROADS.createEdge(HILLS_BRIDGE_NORTH, PADDOCK_EXIT_EAST, edgeBridgeNorth);
ROADS.createEdge(HILLS_EAST_JUNCTION_1, HILLS_EAST_JUNCTION_2, []);
ROADS.createEdge(HILLS_EAST_JUNCTION_2, HILLS_EAST_JUNCTION_3, []);
ROADS.createEdge(HILLS_EAST_JUNCTION_3, HILLS_EAST_JUNCTION_1, []);
ROADS.createEdge(HILLS_EAST_JUNCTION_1, HILLS_BRIDGE_NORTH, hillEastConnector);
ROADS.createEdge(HILLS_WEST, HILLS_BRIDGE_NORTH, hillBypass);
ROADS.createEdge(HILLS_WEST, HILLS_EAST_JUNCTION_2, boxHill);
ROADS.createEdge(HILLS_EAST_JUNCTION_3, HILLS_BRIDGE_SOUTH, keithHill);
ROADS.createEdge(HILLS_ROUNDABOUT_2, HILLS_ROUNDABOUT_1, hillRoundaboutEast);
ROADS.createEdge(HILLS_ROUNDABOUT_1, HILLS_ROUNDABOUT_2, hillRoundaboutWest);
ROADS.createEdge(HILLS_WEST, HILLS_ROUNDABOUT_2, hillRoundaboutToBox);
ROADS.createEdge(
  HILLS_ROUNDABOUT_1,
  HILLS_BRIDGE_SOUTH,
  hillBridgeToRoundabout
);

// City (Roundabout)
const CITY_ROUNDABOUT_1 = ROADS.createNode([51.506856, -0.127461, 25.8]);
const CITY_ROUNDABOUT_2 = ROADS.createNode([51.50733, -0.126726, 23.6]);
const CITY_ROUNDABOUT_3 = ROADS.createNode([51.507869, -0.126799, 24.2]);
const CITY_ROUNDABOUT_4 = ROADS.createNode([51.507991, -0.127225, 24.2]);
const CITY_ROUNDABOUT_5 = ROADS.createNode([51.507333, -0.128384, 24.4]);
const CITY_ROUNDABOUT_6 = ROADS.createNode([51.507098, -0.12811, 24.8]);
ROADS.createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_2, cityRoundabout1To2);
ROADS.createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_3, cityRoundabout1To3);
ROADS.createEdge(CITY_ROUNDABOUT_2, CITY_ROUNDABOUT_5, cityRoundabout2To5);
ROADS.createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_5, cityRoundabout3To5);
ROADS.createEdge(CITY_ROUNDABOUT_6, CITY_ROUNDABOUT_5, cityRoundabout5To6);
ROADS.createEdge(CITY_ROUNDABOUT_4, CITY_ROUNDABOUT_6, cityRoundabout4To6);
ROADS.createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_6, cityRoundabout1To6);

// City (Rest)
const CITY_SOUTH = ROADS.createNode([51.501066, -0.126106, 16]);
const CITY_BRIDGE_SOUTH = ROADS.createNode([51.494804, -0.125123, 15.4]);
ROADS.createEdge(CITY_BRIDGE_SOUTH, HILLS_BRIDGE_SOUTH, edgeBridgeSouth);
ROADS.createEdge(CITY_SOUTH, CITY_BRIDGE_SOUTH, cityBridgeToNorth);
ROADS.createEdge(CITY_SOUTH, CITY_ROUNDABOUT_1, citySouthToRoundabout);
ROADS.createEdge(CITY_ROUNDABOUT_6, CITY_SOUTH, cityMall);
ROADS.createEdge(CITY_ROUNDABOUT_5, CITY_BRIDGE_SOUTH, edgeCityEast);
ROADS.createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_4, cityRoundaboutEast);
ROADS.createEdge(PADDOCK_EXIT_WEST, CITY_ROUNDABOUT_2, edgeNorth);

export default ROADS;
