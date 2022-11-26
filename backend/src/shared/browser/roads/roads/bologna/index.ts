import { Roads } from "../Roads.js";
import edgeRoute from "./edges/route.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

const START = createNode([44.494722, 11.34292, 297.6]);
const END = createNode([44.478304, 11.294632, 493.8]);

const PADDOCK_EXIT = createNode([44.495089, 11.341729, 297.6]);
const PADDOCK_1 = createNode([44.496643, 11.343566, 297.6]);
const PADDOCK_2 = createNode([44.497064, 11.341184, 297.6]);
const PADDOCK_3 = createNode([44.497294, 11.343781, 297.6]);
const PADDOCK_4 = createNode([44.49773, 11.341377, 297.6]);
const PADDOCK_CENTER = createNode([44.497906, 11.342729, 297.6]);
const PADDOCK_ROW_BACK = createNode([44.496827, 11.342365, 297.6]);
const PADDOCK_ROW_FRONT = createNode([44.496115, 11.342107, 297.6]);

createEdge(START, PADDOCK_EXIT, []);
createEdge(PADDOCK_EXIT, END, edgeRoute);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);

export default ROADS;
