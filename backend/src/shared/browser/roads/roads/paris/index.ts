import { Roads } from "../Roads.js";
import edgeLap from "./edges/lap.js";
import edgePaddockExit from "./edges/paddock-exit.js";

const ROADS = new Roads();

const PADDOCK_EXIT = ROADS.createNode([48.867579, 2.314281, 48.2]);
const PADDOCK_1 = ROADS.createNode([48.865897, 2.312644, 48]);
const PADDOCK_2 = ROADS.createNode([48.86579, 2.315323, 48]);
const PADDOCK_3 = ROADS.createNode([48.86523, 2.312568, 48]);
const PADDOCK_4 = ROADS.createNode([48.865117, 2.315277, 48]);
const PADDOCK_CENTER = ROADS.createNode([48.864763, 2.313889, 48]);
const PADDOCK_ROW_FRONT = ROADS.createNode([48.866585, 2.31407, 48]);
const PADDOCK_ROW_BACK = ROADS.createNode([48.865904, 2.313979, 48]);

ROADS.createEdge(PADDOCK_EXIT, PADDOCK_EXIT, edgeLap);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, edgePaddockExit, false);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);

export default ROADS;
