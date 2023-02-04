import { Roads } from "../Roads.js";
import edgeEast from "./edges/country-east.js";
import edgeNorthConnect from "./edges/country-north-connect.js";
import edgeNorth from "./edges/country-north.js";
import edgeSgurrSummit from "./edges/country-sgurr-summit.js";
import edgeSouthEast from "./edges/country-south-east.js";
import edgeSouth from "./edges/country-south.js";
import edgeWestToSummit from "./edges/country-west-to-summit.js";
import edgeWest from "./edges/country-west.js";
import edgeGlasgowEast from "./edges/glasgow-east.js";
import edgeGlasgowExit1 from "./edges/glasgow-exit-1.js";
import edgeGlasgowExit2 from "./edges/glasgow-exit-2.js";
import edgeGlasgowExit3 from "./edges/glasgow-exit-3.js";
import edgeGlasgowExit4 from "./edges/glasgow-exit-4.js";
import edgeGlasgowSouth from "./edges/glasgow-south.js";
import edgeGlasgowWest from "./edges/glasgow-west.js";
import edgeSgurrSummitEast1 from "./edges/sgurr-summit-east-1.js";
import edgeSgurrSummitEast2 from "./edges/sgurr-summit-east-2.js";
import edgeSgurrSummitEast3 from "./edges/sgurr-summit-east-3.js";
import edgeSgurrSummitWest1 from "./edges/sgurr-summit-west-1.js";
import edgeSgurrSummitWest2 from "./edges/sgurr-summit-west-2.js";
import edgeSgurrSummitWest3 from "./edges/sgurr-summit-west-3.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Paddock East
const PADDOCK_EAST_EXIT = createNode([55.64073, -5.218669, 42]);
const PADDOCK_EAST_FRONT = createNode([55.641328, -5.218656, 42]);
const PADDOCK_EAST_BACK = createNode([55.641997, -5.218635, 42]);
const PADDOCK_EAST_CENTER = createNode([55.643151, -5.218661, 42]);
const PADDOCK_EAST_1 = createNode([55.642067, -5.220292, 42]);
const PADDOCK_EAST_2 = createNode([55.642064, -5.217116, 42]);
const PADDOCK_EAST_3 = createNode([55.642718, -5.220196, 42]);
const PADDOCK_EAST_4 = createNode([55.642724, -5.21717, 42]);
createEdge(PADDOCK_EAST_EXIT, PADDOCK_EAST_FRONT, [], false);
createEdge(PADDOCK_EAST_FRONT, PADDOCK_EAST_BACK, [], false);
createEdge(PADDOCK_EAST_BACK, PADDOCK_EAST_CENTER, [], false);
createEdge(PADDOCK_EAST_1, PADDOCK_EAST_FRONT, [], false);
createEdge(PADDOCK_EAST_2, PADDOCK_EAST_FRONT, [], false);
createEdge(PADDOCK_EAST_3, PADDOCK_EAST_BACK, [], false);
createEdge(PADDOCK_EAST_4, PADDOCK_EAST_BACK, [], false);

// Paddock West
const PADDOCK_WEST_FRONT_1 = createNode([55.642704, -5.238298, 53.8]);
const PADDOCK_WEST_FRONT_2 = createNode([55.642708, -5.237562, 53.8]);
const PADDOCK_WEST_FRONT_3 = createNode([55.642708, -5.236864, 53.8]);
const PADDOCK_WEST_FRONT_4 = createNode([55.6427, -5.236174, 53.8]);
const PADDOCK_WEST_BACK_1 = createNode([55.642006, -5.237767, 53.8]);
const PADDOCK_WEST_BACK_2 = createNode([55.642006, -5.237062, 53.8]);
const PADDOCK_WEST_BACK_3 = createNode([55.642006, -5.236364, 53.8]);
const PADDOCK_WEST_BACK_4 = createNode([55.642011, -5.235666, 53.8]);
const PADDOCK_WEST_EXIT = createNode([55.642683, -5.239505, 53.8]);
createEdge(PADDOCK_WEST_FRONT_1, PADDOCK_WEST_BACK_1, [], false);
createEdge(PADDOCK_WEST_FRONT_2, PADDOCK_WEST_BACK_2, [], false);
createEdge(PADDOCK_WEST_FRONT_3, PADDOCK_WEST_BACK_3, [], false);
createEdge(PADDOCK_WEST_FRONT_4, PADDOCK_WEST_BACK_4, [], false);
createEdge(PADDOCK_WEST_FRONT_1, PADDOCK_WEST_FRONT_2, [], false);
createEdge(PADDOCK_WEST_FRONT_2, PADDOCK_WEST_FRONT_3, [], false);
createEdge(PADDOCK_WEST_FRONT_3, PADDOCK_WEST_FRONT_4, [], false);
createEdge(PADDOCK_WEST_EXIT, PADDOCK_WEST_FRONT_1, [], false);

// Glasgow
const GLASGOW_INTERSECTION_SOUTH = createNode([55.639193, -5.218657, 41.8]);
const GLASGOW_EXIT_1 = createNode([55.638207, -5.222368, 35.8]);
const GLASGOW_EXIT_2 = createNode([55.638418, -5.223163, 35.8]);
const GLASGOW_EXIT_3 = createNode([55.638249, -5.223452, 35.8]);
const GLASGOW_EXIT_4 = createNode([55.637954, -5.222841, 35.8]);

createEdge(GLASGOW_EXIT_2, GLASGOW_EXIT_1, edgeGlasgowExit1);
createEdge(GLASGOW_EXIT_2, GLASGOW_EXIT_3, edgeGlasgowExit2);
createEdge(GLASGOW_EXIT_4, GLASGOW_EXIT_3, edgeGlasgowExit3);
createEdge(GLASGOW_EXIT_4, GLASGOW_EXIT_1, edgeGlasgowExit4);

createEdge(PADDOCK_EAST_EXIT, GLASGOW_INTERSECTION_SOUTH, edgeGlasgowEast);
createEdge(PADDOCK_EAST_EXIT, GLASGOW_INTERSECTION_SOUTH, []);
createEdge(GLASGOW_EXIT_1, PADDOCK_EAST_EXIT, edgeGlasgowWest);
createEdge(GLASGOW_INTERSECTION_SOUTH, GLASGOW_EXIT_4, edgeGlasgowSouth);

// Country
const SGURR_SUMMIT_WEST_1 = createNode([55.640414, -5.239623, 53.6]);
const SGURR_SUMMIT_WEST_2 = createNode([55.640901, -5.239931, 53.6]);
const SGURR_SUMMIT_WEST_3 = createNode([55.640029, -5.240339, 53.6]);
createEdge(SGURR_SUMMIT_WEST_1, SGURR_SUMMIT_WEST_2, edgeSgurrSummitWest1);
createEdge(SGURR_SUMMIT_WEST_3, SGURR_SUMMIT_WEST_2, edgeSgurrSummitWest2);
createEdge(SGURR_SUMMIT_WEST_3, SGURR_SUMMIT_WEST_1, edgeSgurrSummitWest3);

const SGURR_SUMMIT_EAST_1 = createNode([55.643343, -5.223189, 27.8]);
const SGURR_SUMMIT_EAST_2 = createNode([55.64383, -5.222526, 27.8]);
const SGURR_SUMMIT_EAST_3 = createNode([55.642931, -5.222276, 27.8]);
createEdge(SGURR_SUMMIT_EAST_2, SGURR_SUMMIT_EAST_1, edgeSgurrSummitEast1);
createEdge(SGURR_SUMMIT_EAST_2, SGURR_SUMMIT_EAST_3, edgeSgurrSummitEast2);
createEdge(SGURR_SUMMIT_EAST_1, SGURR_SUMMIT_EAST_3, edgeSgurrSummitEast3);
createEdge(SGURR_SUMMIT_WEST_1, SGURR_SUMMIT_EAST_1, edgeSgurrSummit);

const NORTH_EAST = createNode([55.65448, -5.228472, 23.8]);
const NORTH_WEST = createNode([55.654753, -5.234813, 26.8]);
createEdge(NORTH_WEST, NORTH_EAST, edgeNorth);
createEdge(NORTH_WEST, NORTH_EAST, edgeNorthConnect);
createEdge(NORTH_EAST, SGURR_SUMMIT_EAST_2, edgeEast);
createEdge(PADDOCK_WEST_EXIT, NORTH_WEST, edgeWest);
createEdge(SGURR_SUMMIT_WEST_2, PADDOCK_WEST_EXIT, edgeWestToSummit);

createEdge(SGURR_SUMMIT_EAST_3, GLASGOW_EXIT_2, edgeSouthEast);
createEdge(GLASGOW_EXIT_3, SGURR_SUMMIT_WEST_3, edgeSouth);

export default ROADS;
