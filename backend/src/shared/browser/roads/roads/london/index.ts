import { Roads } from "../Roads.js";
import boxHill from "./edges/box-hill.js";
import edgeBridgeNorth from "./edges/bridge-north.js";
import edgeBridgeSouth from "./edges/bridge-south.js";
import cityBridgeToNorth from "./edges/city-bridge-to-north.js";
import edgeCityEast from "./edges/city-east.js";
import cityMall from "./edges/city-mall.js";
import cityRoundabout1To2 from "./edges/city-roundabout-1-to-2.js";
import cityRoundabout1To3 from "./edges/city-roundabout-1-to-3.js";
import cityRoundabout1To6 from "./edges/city-roundabout-1-to-6.js";
import cityRoundabout2To5 from "./edges/city-roundabout-2-to-5.js";
import cityRoundabout3To5 from "./edges/city-roundabout-3-to-5.js";
import cityRoundabout4To6 from "./edges/city-roundabout-4-to-6.js";
import cityRoundabout5To6 from "./edges/city-roundabout-5-to-6.js";
import cityRoundaboutEast from "./edges/city-roundabout-east.js";
import citySouthToRoundabout from "./edges/city-south-to-roundabout.js";
import hillBridgeToRoundabout from "./edges/hill-bridge-to-roundabout.js";
import hillBypass from "./edges/hill-bypass.js";
import hillEastConnector from "./edges/hill-east-connector.js";
import hillRoundaboutEast from "./edges/hill-roundabout-east.js";
import hillRoundaboutToBox from "./edges/hill-roundabout-to-box.js";
import hillRoundaboutWest from "./edges/hill-roundabout-west.js";
import keithHill from "./edges/keith-hill.js";
import edgeNorth from "./edges/north.js";
import paddockExits from "./edges/paddock-exits.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Paddock
const PADDOCK_SPLIT = createNode([51.510293, -0.076103, 18]);
const PADDOCK_EXIT_EAST = createNode([51.50976, -0.074885, 18.6]);
const PADDOCK_EXIT_WEST = createNode([51.509418, -0.076892, 18]);
const PADDOCK_ROW_FRONT = createNode([51.511349, -0.076165, 18]);
const PADDOCK_ROW_BACK = createNode([51.512052, -0.07621, 18]);
const PADDOCK_1 = createNode([51.512066, -0.07511, 18]);
const PADDOCK_2 = createNode([51.512057, -0.077424, 18]);
const PADDOCK_3 = createNode([51.512586, -0.075308, 18]);
const PADDOCK_4 = createNode([51.512609, -0.07728, 18]);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_SPLIT, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_SPLIT, PADDOCK_EXIT_EAST, [], false);
createEdge(PADDOCK_SPLIT, PADDOCK_EXIT_WEST, [], false);
createEdge(PADDOCK_EXIT_EAST, PADDOCK_EXIT_WEST, paddockExits);

// Hills
const HILLS_WEST = createNode([51.499308, -0.110976, 22]);
const HILLS_BRIDGE_SOUTH = createNode([51.494467, -0.111343, 5.4]);
const HILLS_BRIDGE_NORTH = createNode([51.498256, -0.076069, 11]);
const HILLS_EAST_JUNCTION_1 = createNode([51.496338, -0.073113, 26.2]);
const HILLS_EAST_JUNCTION_2 = createNode([51.496017, -0.073456, 28]);
const HILLS_EAST_JUNCTION_3 = createNode([51.496044, -0.072727, 26.6]);
const HILLS_ROUNDABOUT_1 = createNode([51.495602, -0.111053, 3.6]);
const HILLS_ROUNDABOUT_2 = createNode([51.495942, -0.110363, 4.4]);
createEdge(HILLS_BRIDGE_NORTH, PADDOCK_EXIT_EAST, edgeBridgeNorth);
createEdge(HILLS_EAST_JUNCTION_1, HILLS_EAST_JUNCTION_2, []);
createEdge(HILLS_EAST_JUNCTION_2, HILLS_EAST_JUNCTION_3, []);
createEdge(HILLS_EAST_JUNCTION_3, HILLS_EAST_JUNCTION_1, []);
createEdge(HILLS_EAST_JUNCTION_1, HILLS_BRIDGE_NORTH, hillEastConnector);
createEdge(HILLS_WEST, HILLS_BRIDGE_NORTH, hillBypass);
createEdge(HILLS_WEST, HILLS_EAST_JUNCTION_2, boxHill);
createEdge(HILLS_EAST_JUNCTION_3, HILLS_BRIDGE_SOUTH, keithHill);
createEdge(HILLS_ROUNDABOUT_2, HILLS_ROUNDABOUT_1, hillRoundaboutEast);
createEdge(HILLS_ROUNDABOUT_1, HILLS_ROUNDABOUT_2, hillRoundaboutWest);
createEdge(HILLS_WEST, HILLS_ROUNDABOUT_2, hillRoundaboutToBox);
createEdge(HILLS_ROUNDABOUT_1, HILLS_BRIDGE_SOUTH, hillBridgeToRoundabout);

// City (Roundabout)
const CITY_ROUNDABOUT_1 = createNode([51.506856, -0.127461, 25.8]);
const CITY_ROUNDABOUT_2 = createNode([51.50733, -0.126726, 23.3]);
const CITY_ROUNDABOUT_3 = createNode([51.507869, -0.126799, 24.2]);
const CITY_ROUNDABOUT_4 = createNode([51.507991, -0.127225, 24.2]);
const CITY_ROUNDABOUT_5 = createNode([51.507333, -0.128384, 24.4]);
const CITY_ROUNDABOUT_6 = createNode([51.507098, -0.12811, 24.8]);
createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_2, cityRoundabout1To2);
createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_3, cityRoundabout1To3);
createEdge(CITY_ROUNDABOUT_2, CITY_ROUNDABOUT_5, cityRoundabout2To5);
createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_5, cityRoundabout3To5);
createEdge(CITY_ROUNDABOUT_6, CITY_ROUNDABOUT_5, cityRoundabout5To6);
createEdge(CITY_ROUNDABOUT_4, CITY_ROUNDABOUT_6, cityRoundabout4To6);
createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_6, cityRoundabout1To6);

// City (Rest)
const CITY_SOUTH = createNode([51.501066, -0.126106, 16]);
const CITY_BRIDGE_SOUTH = createNode([51.494804, -0.125123, 15.4]);
createEdge(CITY_BRIDGE_SOUTH, HILLS_BRIDGE_SOUTH, edgeBridgeSouth);
createEdge(CITY_SOUTH, CITY_BRIDGE_SOUTH, cityBridgeToNorth);
createEdge(CITY_SOUTH, CITY_ROUNDABOUT_1, citySouthToRoundabout);
createEdge(CITY_ROUNDABOUT_6, CITY_SOUTH, cityMall);
createEdge(CITY_ROUNDABOUT_5, CITY_BRIDGE_SOUTH, edgeCityEast);
createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_4, cityRoundaboutEast);
createEdge(PADDOCK_EXIT_WEST, CITY_ROUNDABOUT_2, edgeNorth);

export default ROADS;
