import { Roads } from "../Roads.js";
import edgeLap from "./edges/lap.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

const PADDOCK_EXIT = createNode([-10.383915, 165.801973, 119.4]);
const PADDOCK_1 = createNode([-10.384382, 165.803166, 119.4]);
const PADDOCK_2 = createNode([-10.383472, 165.803158, 119.4]);
const PADDOCK_3 = createNode([-10.384388, 165.803521, 119.4]);
const PADDOCK_4 = createNode([-10.383479, 165.803512, 119.4]);
const PADDOCK_CENTER = createNode([-10.383925, 165.803517, 119.4]);
const PADDOCK_ROW_FRONT = createNode([-10.383915, 165.80272, 119.4]);
const PADDOCK_ROW_BACK = createNode([-10.383919, 165.803081, 119.4]);

createEdge(PADDOCK_EXIT, PADDOCK_EXIT, edgeLap);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);

export default ROADS;
