import { Roads } from "../Roads.js";
import sgurrSummit from "./edges/sgurr-summit.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

const SGURR_SUMMIT_NORTH = createNode([55.643343, -5.223189, 27.8]);
const SGURR_SUMMIT_SOUTH = createNode([55.640414, -5.239623, 53.6]);

createEdge(SGURR_SUMMIT_SOUTH, SGURR_SUMMIT_NORTH, sgurrSummit);

export default ROADS;
