import { Roads } from "../Roads.js";
import edgeEastSouth from "./edges/east-south.js";
import edgeEastNorth from "./edges/east-north.js";
import edgeMiddle from "./edges/middle.js";
import edgeWest from "./edges/west.js";

const ROADS = new Roads();

// Paddock
const PADDOCK_EXIT = ROADS.createNode([37.540779, -77.433684, 51.2]);
const PADDOCK_ROW_FRONT = ROADS.createNode([37.541728, -77.432821, 51.2]);
const PADDOCK_ROW_BACK = ROADS.createNode([37.542255, -77.432236, 51.2]);
const PADDOCK_1 = ROADS.createNode([37.54231, -77.433845, 51.2]);
const PADDOCK_2 = ROADS.createNode([37.541004, -77.431598, 51.2]);
const PADDOCK_4 = ROADS.createNode([37.541498, -77.431056, 51.2]);
const PADDOCK_3 = ROADS.createNode([37.54285, -77.433266, 51.2]);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);

// Roads
const EAST_JUNCTION = ROADS.createNode([37.544546, -77.440161, 53.6]);
const WEST_JUNCTION = ROADS.createNode([37.547104, -77.448764, 52.6]);

ROADS.createEdge(PADDOCK_EXIT, EAST_JUNCTION, edgeEastSouth);
ROADS.createEdge(EAST_JUNCTION, PADDOCK_EXIT, edgeEastNorth);
// actually there are two roads, but that would only make things complicated
ROADS.createEdge(EAST_JUNCTION, WEST_JUNCTION, edgeMiddle);
ROADS.createEdge(WEST_JUNCTION, WEST_JUNCTION, edgeWest);

export default ROADS;
