import { Roads } from "../Roads.js";
import edgeSmallLoop from "./edges/small-loop.js";
import edgeBigLoopSouth from "./edges/big-loop-south.js";
import edgeBigLoopNorth from "./edges/big-loop-north.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

const PADDOCK_EXIT = createNode([53.990383, -1.541467, 124.8]);
const PADDOCK_1 = createNode([53.990773, -1.544834, 124.8]);
const PADDOCK_2 = createNode([53.989051, -1.54404, 124.8]);
const PADDOCK_3 = createNode([53.99059, -1.545918, 124.8]);
const PADDOCK_4 = createNode([53.988887, -1.545103, 124.8]);
const PADDOCK_CENTER = createNode([53.989625, -1.546251, 124.8]);
const PADDOCK_ROW_FRONT = createNode([53.990134, -1.54319, 124.8]);
const PADDOCK_ROW_BACK = createNode([53.989928, -1.544358, 124.8]);
const JUNCTION_NORTH = createNode([53.993835, -1.546892, 108.4]);
const JUNCTION_SOUTH = createNode([53.993627, -1.547179, 108.4]);

createEdge(JUNCTION_SOUTH, PADDOCK_EXIT, edgeBigLoopSouth);
createEdge(PADDOCK_EXIT, JUNCTION_NORTH, edgeBigLoopNorth);
createEdge(JUNCTION_SOUTH, JUNCTION_NORTH, edgeSmallLoop);
createEdge(JUNCTION_NORTH, JUNCTION_SOUTH, []);

createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);

export default ROADS;
