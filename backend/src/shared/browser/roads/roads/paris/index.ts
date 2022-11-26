import { Roads } from "../Roads.js";
import edgeLap from "./edges/lap.js";
import edgePaddockExit from "./edges/paddock-exit.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

const PADDOCK_EXIT = createNode([48.867579, 2.314281, 48.2]);
const PADDOCK_1 = createNode([48.865897, 2.312644, 48]);
const PADDOCK_2 = createNode([48.86579, 2.315323, 48]);
const PADDOCK_3 = createNode([48.86523, 2.312568, 48]);
const PADDOCK_4 = createNode([48.865117, 2.315277, 48]);
const PADDOCK_CENTER = createNode([48.864763, 2.313889, 48]);
const PADDOCK_ROW_FRONT = createNode([48.866585, 2.31407, 48]);
const PADDOCK_ROW_BACK = createNode([48.865904, 2.313979, 48]);

createEdge(PADDOCK_EXIT, PADDOCK_EXIT, edgeLap);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, edgePaddockExit, false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);

export default ROADS;
