import { Roads } from "../../../services/Roads";
import edgeNorth from "./edges/north";
import edgeBridgeNorth from "./edges/bridge-north";
import edgeBridgeSouth from "./edges/bridge-south";
import edgeCityEast from "./edges/city-east";

const ROADS = new Roads();

// Paddock
const PADDOCK_EXIT = ROADS.createNode([51.509558, -0.076024, 18]);
const PADDOCK_ROW_FRONT = ROADS.createNode([51.511349, -0.076165, 18]);
const PADDOCK_ROW_BACK = ROADS.createNode([51.512052, -0.07621, 18]);
const PADDOCK_1 = ROADS.createNode([51.512066, -0.07511, 18]);
const PADDOCK_2 = ROADS.createNode([51.512057, -0.077424, 18]);
const PADDOCK_3 = ROADS.createNode([51.512586, -0.075308, 18]);
const PADDOCK_4 = ROADS.createNode([51.512609, -0.07728, 18]);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);

// Hills
const HILLS_WEST = ROADS.createNode([51.499308, -0.110976, 0]);
const HILLS_BRIDGE_SOUTH = ROADS.createNode([51.494467, -0.111343, 5.4]);
const HILLS_BRIDGE_NORTH = ROADS.createNode([51.498256, -0.076069, 0]);
const HILLS_EAST_JUNCTION_1 = ROADS.createNode([51.496338, -0.073113, 0]);
const HILLS_EAST_JUNCTION_2 = ROADS.createNode([51.496017, -0.073456, 0]);
const HILLS_EAST_JUNCTION_3 = ROADS.createNode([51.496044, -0.072727, 0]);
const HILLS_ROUNDABOUT_1 = ROADS.createNode([51.495602, -0.111053, 0]);
const HILLS_ROUNDABOUT_2 = ROADS.createNode([51.495942, -0.110363, 0]);
ROADS.createEdge(HILLS_BRIDGE_NORTH, PADDOCK_EXIT, edgeBridgeNorth);
ROADS.createEdge(HILLS_EAST_JUNCTION_1, HILLS_EAST_JUNCTION_2, []);
ROADS.createEdge(HILLS_EAST_JUNCTION_2, HILLS_EAST_JUNCTION_3, []);
ROADS.createEdge(HILLS_EAST_JUNCTION_3, HILLS_EAST_JUNCTION_1, []);
ROADS.createEdge(HILLS_BRIDGE_NORTH, HILLS_EAST_JUNCTION_1, []);
ROADS.createEdge(HILLS_BRIDGE_NORTH, HILLS_WEST, []);
ROADS.createEdge(HILLS_WEST, HILLS_EAST_JUNCTION_2, []);
ROADS.createEdge(HILLS_BRIDGE_SOUTH, HILLS_EAST_JUNCTION_3, []);
ROADS.createEdge(HILLS_ROUNDABOUT_1, HILLS_ROUNDABOUT_2, []);
ROADS.createEdge(HILLS_ROUNDABOUT_1, HILLS_ROUNDABOUT_2, []);
ROADS.createEdge(HILLS_WEST, HILLS_ROUNDABOUT_2, []);
ROADS.createEdge(HILLS_BRIDGE_SOUTH, HILLS_ROUNDABOUT_1, []);

// City (Roundabout)
const CITY_ROUNDABOUT_1 = ROADS.createNode([51.507205, -0.127434, 0]);
const CITY_ROUNDABOUT_2 = ROADS.createNode([51.507403, -0.127017, 23.6]);
const CITY_ROUNDABOUT_3 = ROADS.createNode([51.507786, -0.12688, 0]);
const CITY_ROUNDABOUT_4 = ROADS.createNode([51.507847, -0.127146, 0]);
const CITY_ROUNDABOUT_5 = ROADS.createNode([51.507342, -0.128162, 24.4]);
const CITY_ROUNDABOUT_6 = ROADS.createNode([51.507209, -0.128018, 0]);
ROADS.createEdge(CITY_ROUNDABOUT_1, CITY_ROUNDABOUT_2, []);
ROADS.createEdge(CITY_ROUNDABOUT_2, CITY_ROUNDABOUT_3, []);
ROADS.createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_4, []);
ROADS.createEdge(CITY_ROUNDABOUT_4, CITY_ROUNDABOUT_5, []);
ROADS.createEdge(CITY_ROUNDABOUT_5, CITY_ROUNDABOUT_6, []);
ROADS.createEdge(CITY_ROUNDABOUT_6, CITY_ROUNDABOUT_1, []);

// City (Rest)
const CITY_SOUTH = ROADS.createNode([51.501066, -0.126106, 0]);
const CITY_BRIDGE_SOUTH = ROADS.createNode([51.494804, -0.125123, 15.4]);
ROADS.createEdge(CITY_BRIDGE_SOUTH, HILLS_BRIDGE_SOUTH, edgeBridgeSouth);
ROADS.createEdge(CITY_BRIDGE_SOUTH, CITY_SOUTH, []);
ROADS.createEdge(CITY_SOUTH, CITY_ROUNDABOUT_1, []);
ROADS.createEdge(CITY_SOUTH, CITY_ROUNDABOUT_6, []);
ROADS.createEdge(CITY_ROUNDABOUT_5, CITY_BRIDGE_SOUTH, edgeCityEast);
ROADS.createEdge(CITY_ROUNDABOUT_3, CITY_ROUNDABOUT_4, []);
ROADS.createEdge(PADDOCK_EXIT, CITY_ROUNDABOUT_2, edgeNorth);

export default ROADS;
