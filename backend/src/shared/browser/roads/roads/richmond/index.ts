import { Roads } from "../Roads.js";
import edgeEastSouth from "./edges/east-south.js";
import edgeEastNorth from "./edges/east-north.js";
import edgeMiddle from "./edges/middle.js";
import edgeWest from "./edges/west.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Paddock
const PADDOCK_EXIT = createNode([37.540779, -77.433684, 51.2]);
const PADDOCK_ROW_FRONT = createNode([37.541728, -77.432821, 51.2]);
const PADDOCK_ROW_BACK = createNode([37.542255, -77.432236, 51.2]);
const PADDOCK_1 = createNode([37.54231, -77.433845, 51.2]);
const PADDOCK_2 = createNode([37.541004, -77.431598, 51.2]);
const PADDOCK_4 = createNode([37.541498, -77.431056, 51.2]);
const PADDOCK_3 = createNode([37.54285, -77.433266, 51.2]);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);

// Roads
const EAST_JUNCTION = createNode([37.544546, -77.440161, 53.6]);
const WEST_JUNCTION = createNode([37.547104, -77.448764, 52.6]);

createEdge(PADDOCK_EXIT, EAST_JUNCTION, edgeEastSouth);
createEdge(EAST_JUNCTION, PADDOCK_EXIT, edgeEastNorth);
// actually there are two roads, but that would only make things complicated
createEdge(EAST_JUNCTION, WEST_JUNCTION, edgeMiddle);
createEdge(WEST_JUNCTION, WEST_JUNCTION, edgeWest);

export default ROADS;
