import { Roads } from "../../../services/Roads";
import edgeSmallLoop from "./edges/small-loop";
import edgeBigLoopSouth from "./edges/big-loop-south";
import edgeBigLoopNorth from "./edges/big-loop-north";

const ROADS = new Roads();

const PADDOCK_EXIT = ROADS.createNode([53.990383, -1.541467, 0]); // TODO
const PADDOCK_1 = ROADS.createNode([53.990773, -1.544834, 0]); // TODO
const PADDOCK_2 = ROADS.createNode([53.989051, -1.54404, 0]); // TODO
const PADDOCK_3 = ROADS.createNode([53.99059, -1.545918, 0]); // TODO
const PADDOCK_4 = ROADS.createNode([53.988887, -1.545103, 0]); // TODO
const PADDOCK_CENTER = ROADS.createNode([53.989625, -1.546251, 0]); // TODO
const PADDOCK_ROW_FRONT = ROADS.createNode([53.990134, -1.54319, 0]); // TODO
const PADDOCK_ROW_BACK = ROADS.createNode([53.989928, -1.544358, 0]); // TODO
const JUNCTION_NORTH = ROADS.createNode([53.993835, -1.546892, 0]); // TODO
const JUNCTION_SOUTH = ROADS.createNode([53.993627, -1.547179, 108.4]);

ROADS.createEdge(JUNCTION_SOUTH, PADDOCK_EXIT, edgeBigLoopSouth);
ROADS.createEdge(PADDOCK_EXIT, JUNCTION_NORTH, edgeBigLoopNorth);
ROADS.createEdge(JUNCTION_SOUTH, JUNCTION_NORTH, edgeSmallLoop);
ROADS.createEdge(JUNCTION_NORTH, JUNCTION_SOUTH, []);

ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []);

export default ROADS;
