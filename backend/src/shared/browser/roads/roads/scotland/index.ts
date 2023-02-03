import { Roads } from "../Roads.js";
import edgeSgurrSummit from "./edges/sgurr-summit.js";
import edgeEast from "./edges/east.js";
import edgeNorth from "./edges/north.js";
import edgeNorthConnect from "./edges/north-connect.js";
import edgeWest from "./edges/west.js";
import edgeGlasgowEast from "./edges/glasgow-east.js";
import edgeGlasgowWest from "./edges/glasgow-west.js";
import edgeGlasgowSouth from "./edges/glasgow-south.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// North
const SGURR_SUMMIT_WEST_1 = createNode([55.640414, -5.239623, 53.6]);
const SGURR_SUMMIT_WEST_2 = createNode([55.640901, -5.239931, 53.6]);
const SGURR_SUMMIT_WEST_3 = createNode([55.640029, -5.240339, 53.6]);
createEdge(SGURR_SUMMIT_WEST_1, SGURR_SUMMIT_WEST_2, []);
createEdge(SGURR_SUMMIT_WEST_2, SGURR_SUMMIT_WEST_3, []);
createEdge(SGURR_SUMMIT_WEST_3, SGURR_SUMMIT_WEST_1, []);

const SGURR_SUMMIT_EAST_1 = createNode([55.643343, -5.223189, 27.8]);
const SGURR_SUMMIT_EAST_2 = createNode([55.643847, -5.222427, 27.8]);
const SGURR_SUMMIT_EAST_3 = createNode([55.642939, -5.222146, 27.8]);
createEdge(SGURR_SUMMIT_EAST_1, SGURR_SUMMIT_EAST_2, []);
createEdge(SGURR_SUMMIT_EAST_2, SGURR_SUMMIT_EAST_3, []);
createEdge(SGURR_SUMMIT_EAST_3, SGURR_SUMMIT_EAST_1, []);

createEdge(SGURR_SUMMIT_WEST_1, SGURR_SUMMIT_EAST_1, edgeSgurrSummit);

const NORTH_EAST = createNode([55.65448, -5.228472, 0]);
const NORTH_WEST = createNode([55.654753, -5.234813, 0]);
createEdge(NORTH_WEST, NORTH_EAST, edgeNorth);
createEdge(NORTH_WEST, NORTH_EAST, edgeNorthConnect);
createEdge(NORTH_EAST, SGURR_SUMMIT_EAST_2, edgeEast);
createEdge(SGURR_SUMMIT_WEST_2, NORTH_WEST, edgeWest);

// Paddock West
const PADDOCK_WEST_FRONT_1 = createNode([55.642704, -5.238298, 0]);
const PADDOCK_WEST_FRONT_2 = createNode([55.642708, -5.237562, 0]);
const PADDOCK_WEST_FRONT_3 = createNode([55.642708, -5.236864, 0]);
const PADDOCK_WEST_FRONT_4 = createNode([55.6427, -5.236174, 0]);
const PADDOCK_WEST_BACK_1 = createNode([55.642006, -5.237767, 0]);
const PADDOCK_WEST_BACK_2 = createNode([55.642006, -5.237062, 0]);
const PADDOCK_WEST_BACK_3 = createNode([55.642006, -5.236364, 0]);
const PADDOCK_WEST_BACK_4 = createNode([55.642011, -5.235666, 0]);
createEdge(PADDOCK_WEST_FRONT_1, PADDOCK_WEST_BACK_1, []);
createEdge(PADDOCK_WEST_FRONT_2, PADDOCK_WEST_BACK_2, []);
createEdge(PADDOCK_WEST_FRONT_3, PADDOCK_WEST_BACK_3, []);
createEdge(PADDOCK_WEST_FRONT_4, PADDOCK_WEST_BACK_4, []);
createEdge(PADDOCK_WEST_FRONT_1, PADDOCK_WEST_FRONT_2, []);
createEdge(PADDOCK_WEST_FRONT_2, PADDOCK_WEST_FRONT_3, []);
createEdge(PADDOCK_WEST_FRONT_3, PADDOCK_WEST_FRONT_4, []);

// Paddock East
const PADDOCK_EAST_EXIT = createNode([55.64073, -5.218669, 42]);
const PADDOCK_EAST_FRONT = createNode([55.641328, -5.218656, 42]);
const PADDOCK_EAST_BACK = createNode([55.641997, -5.218635, 42]);
const PADDOCK_EAST_CENTER = createNode([55.643151, -5.218661, 42]);
const PADDOCK_EAST_1 = createNode([55.642067, -5.220292, 42]);
const PADDOCK_EAST_2 = createNode([55.642064, -5.217116, 42]);
const PADDOCK_EAST_3 = createNode([55.642718, -5.220196, 42]);
const PADDOCK_EAST_4 = createNode([55.642724, -5.21717, 42]);
createEdge(PADDOCK_EAST_EXIT, PADDOCK_EAST_FRONT, []);
createEdge(PADDOCK_EAST_FRONT, PADDOCK_EAST_BACK, []);
createEdge(PADDOCK_EAST_BACK, PADDOCK_EAST_CENTER, []);
createEdge(PADDOCK_EAST_1, PADDOCK_EAST_FRONT, []);
createEdge(PADDOCK_EAST_2, PADDOCK_EAST_FRONT, []);
createEdge(PADDOCK_EAST_3, PADDOCK_EAST_BACK, []);
createEdge(PADDOCK_EAST_4, PADDOCK_EAST_BACK, []);

// Glasgow
const GLASGOW_INTERSECTION_SOUTH = createNode([55.639193, -5.218657, 41.8]);
const GLASGOW_EXIT_1 = createNode([55.638207, -5.222368, 0]);
const GLASGOW_EXIT_2 = createNode([55.638425, -5.223076, 0]);
const GLASGOW_EXIT_3 = createNode([55.638249, -5.223452, 0]);
const GLASGOW_EXIT_4 = createNode([55.637954, -5.222841, 0]);

createEdge(GLASGOW_EXIT_1, GLASGOW_EXIT_2, []);
createEdge(GLASGOW_EXIT_2, GLASGOW_EXIT_3, []);
createEdge(GLASGOW_EXIT_3, GLASGOW_EXIT_4, []);
createEdge(GLASGOW_EXIT_4, GLASGOW_EXIT_1, []);

createEdge(PADDOCK_EAST_EXIT, GLASGOW_INTERSECTION_SOUTH, edgeGlasgowEast);
createEdge(PADDOCK_EAST_EXIT, GLASGOW_INTERSECTION_SOUTH, []);
createEdge(GLASGOW_EXIT_1, PADDOCK_EAST_EXIT, edgeGlasgowWest);
createEdge(GLASGOW_INTERSECTION_SOUTH, GLASGOW_EXIT_4, edgeGlasgowSouth);

export default ROADS;
