import { Roads } from "../Roads.js";
import edgeLap from "./edges/lap.js";

const ROADS = new Roads();

const PADDOCK_EXIT = ROADS.createNode([-10.383915, 165.801973, 119.4]);
const PADDOCK_1 = ROADS.createNode([-10.384382, 165.803166, 119.4]);
const PADDOCK_2 = ROADS.createNode([-10.383472, 165.803158, 119.4]);
const PADDOCK_3 = ROADS.createNode([-10.384388, 165.803521, 119.4]);
const PADDOCK_4 = ROADS.createNode([-10.383479, 165.803512, 119.4]);
const PADDOCK_CENTER = ROADS.createNode([-10.383925, 165.803517, 119.4]);
const PADDOCK_ROW_FRONT = ROADS.createNode([-10.383915, 165.80272, 119.4]);
const PADDOCK_ROW_BACK = ROADS.createNode([-10.383919, 165.803081, 119.4]);

ROADS.createEdge(PADDOCK_EXIT, PADDOCK_EXIT, edgeLap);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []);

export default ROADS;
