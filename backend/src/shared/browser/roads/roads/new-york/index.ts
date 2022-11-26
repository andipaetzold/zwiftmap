import { Roads } from "../Roads.js";
import edgeNorth1 from "./edges/north-1.js";
import edgeNorth2 from "./edges/north-2.js";
import edgeNorth3 from "./edges/north-3.js";
import edgeNorth4 from "./edges/north-4.js";
import edgeNorth5 from "./edges/north-5.js";
import edgeNorth6 from "./edges/north-6.js";
import edgeNorth7 from "./edges/north-7.js";
import edgeNorth8 from "./edges/north-8.js";
import edgeSouth1 from "./edges/south-1.js";
import edgeSouth2 from "./edges/south-2.js";
import edgeSouth3 from "./edges/south-3.js";
import edgeSouth4 from "./edges/south-4.js";
import edgeSouth5 from "./edges/south-5.js";
import edgeSouth6 from "./edges/south-6.js";
import edgeSouth7 from "./edges/south-7.js";
import edgeSouth8 from "./edges/south-8.js";
import edgeSouth9 from "./edges/south-9.js";
import edgeSouth10 from "./edges/south-10.js";
import edgeSouth11 from "./edges/south-11.js";
import {
  edgeNorthJunctionA1,
  edgeNorthJunctionA2,
  edgeNorthJunctionA3,
} from "./edges/north-junction-a.js";
import {
  edgeNorthJunctionB1,
  edgeNorthJunctionB2,
  edgeNorthJunctionB3,
} from "./edges/north-junction-b.js";
import {
  edgeNorthJunctionC1,
  edgeNorthJunctionC2,
  edgeNorthJunctionC3,
} from "./edges/north-junction-c.js";
import {
  edgeNorthJunctionD1,
  edgeNorthJunctionD2,
  edgeNorthJunctionD3,
} from "./edges/north-junction-d.js";
import {
  edgeNorthJunctionE1,
  edgeNorthJunctionE2,
  edgeNorthJunctionE3,
} from "./edges/north-junction-e.js";
import {
  edgeNorthJunctionF1,
  edgeNorthJunctionF2,
  edgeNorthJunctionF3,
} from "./edges/north-junction-f.js";
import {
  edgeSouthJunctionA1,
  edgeSouthJunctionA2,
  edgeSouthJunctionA3,
} from "./edges/south-junction-a.js";
import {
  edgeSouthJunctionB1,
  edgeSouthJunctionB2,
  edgeSouthJunctionB3,
} from "./edges/south-junction-b.js";
import {
  edgeSouthJunctionC1,
  edgeSouthJunctionC2,
  edgeSouthJunctionC3,
} from "./edges/south-junction-c.js";
import {
  edgeSouthJunctionD1,
  edgeSouthJunctionD2,
  edgeSouthJunctionD3,
} from "./edges/south-junction-d.js";
import {
  edgeSouthJunctionE1,
  edgeSouthJunctionE2,
  edgeSouthJunctionE3,
} from "./edges/south-junction-e.js";
import {
  edgeSouthJunctionF1,
  edgeSouthJunctionF2,
  edgeSouthJunctionF3,
} from "./edges/south-junction-f.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Paddock
const PADDOCK_EXIT = createNode([40.777649, -73.966935, 33.6]);
const PADDOCK_ROW_BACK = createNode([40.777877, -73.969241, 33.6]);
const PADDOCK_ROW_FRONT = createNode([40.777804, -73.968287, 33.6]);
const PADDOCK_1 = createNode([40.77708, -73.969456, 33.6]);
const PADDOCK_2 = createNode([40.778681, -73.969113, 33.6]);
const PADDOCK_3 = createNode([40.777194, -73.970346, 33.6]);
const PADDOCK_4 = createNode([40.778819, -73.970014, 33.6]);
const PADDOCK_CENTER = createNode([40.778015, -73.970475, 33.6]);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);

// North Nodes
const NORTH_JUNCTION_A_1 = createNode([40.798365, -73.958125, 32.8]);
const NORTH_JUNCTION_A_2 = createNode([40.798221, -73.959115, 32.2]);
const NORTH_JUNCTION_A_3 = createNode([40.799062, -73.95849, 24.4]);
createEdge(NORTH_JUNCTION_A_2, NORTH_JUNCTION_A_1, edgeNorthJunctionA1);
createEdge(NORTH_JUNCTION_A_3, NORTH_JUNCTION_A_2, edgeNorthJunctionA2);
createEdge(NORTH_JUNCTION_A_1, NORTH_JUNCTION_A_3, edgeNorthJunctionA3);

const NORTH_JUNCTION_B_1 = createNode([40.798473, -73.954352, 8.2]);
const NORTH_JUNCTION_B_2 = createNode([40.797977, -73.954256, 5.6]);
const NORTH_JUNCTION_B_3 = createNode([40.798209, -73.953601, 6.6]);
createEdge(NORTH_JUNCTION_B_2, NORTH_JUNCTION_B_1, edgeNorthJunctionB1);
createEdge(NORTH_JUNCTION_B_2, NORTH_JUNCTION_B_3, edgeNorthJunctionB2);
createEdge(NORTH_JUNCTION_B_3, NORTH_JUNCTION_B_1, edgeNorthJunctionB3);

const NORTH_JUNCTION_C_1 = createNode([40.794241, -73.95962, 22.2]);
const NORTH_JUNCTION_C_2 = createNode([40.794617, -73.95926, 20]);
const NORTH_JUNCTION_C_3 = createNode([40.794198, -73.959089, 21.4]);
createEdge(NORTH_JUNCTION_C_2, NORTH_JUNCTION_C_1, edgeNorthJunctionC1);
createEdge(NORTH_JUNCTION_C_3, NORTH_JUNCTION_C_2, edgeNorthJunctionC2);
createEdge(NORTH_JUNCTION_C_3, NORTH_JUNCTION_C_1, edgeNorthJunctionC3);

const NORTH_JUNCTION_D_1 = createNode([40.794459, -73.955277, 28.8]);
const NORTH_JUNCTION_D_2 = createNode([40.794623, -73.954567, 27.2]);
const NORTH_JUNCTION_D_3 = createNode([40.793985, -73.954943, 28.4]);
createEdge(NORTH_JUNCTION_D_1, NORTH_JUNCTION_D_2, edgeNorthJunctionD1);
createEdge(NORTH_JUNCTION_D_3, NORTH_JUNCTION_D_2, edgeNorthJunctionD2);
createEdge(NORTH_JUNCTION_D_1, NORTH_JUNCTION_D_3, edgeNorthJunctionD3);

const NORTH_JUNCTION_E_1 = createNode([40.791709, -73.961053, 62.6]);
const NORTH_JUNCTION_E_2 = createNode([40.791354, -73.961417, 62.6]);
const NORTH_JUNCTION_E_3 = createNode([40.792012, -73.961479, 62.6]);
createEdge(NORTH_JUNCTION_E_2, NORTH_JUNCTION_E_1, edgeNorthJunctionE1);
createEdge(NORTH_JUNCTION_E_2, NORTH_JUNCTION_E_3, edgeNorthJunctionE2);
createEdge(NORTH_JUNCTION_E_3, NORTH_JUNCTION_E_1, edgeNorthJunctionE3);

const NORTH_JUNCTION_F_1 = createNode([40.78847, -73.958695, 56.2]);
const NORTH_JUNCTION_F_2 = createNode([40.787964, -73.958486, 56.2]);
const NORTH_JUNCTION_F_3 = createNode([40.788575, -73.958038, 56.2]);
createEdge(NORTH_JUNCTION_F_2, NORTH_JUNCTION_F_1, edgeNorthJunctionF1);
createEdge(NORTH_JUNCTION_F_3, NORTH_JUNCTION_F_2, edgeNorthJunctionF2);
createEdge(NORTH_JUNCTION_F_3, NORTH_JUNCTION_F_1, edgeNorthJunctionF3);

// South Nodes
const SOUTH_JUNCTION_A_1 = createNode([40.782047, -73.967935, 63.6]);
const SOUTH_JUNCTION_A_2 = createNode([40.782279, -73.967396, 63]);
const SOUTH_JUNCTION_A_3 = createNode([40.782681, -73.967726, 63.6]);
createEdge(SOUTH_JUNCTION_A_2, SOUTH_JUNCTION_A_1, edgeSouthJunctionA1);
createEdge(SOUTH_JUNCTION_A_2, SOUTH_JUNCTION_A_3, edgeSouthJunctionA2);
createEdge(SOUTH_JUNCTION_A_1, SOUTH_JUNCTION_A_3, edgeSouthJunctionA3);

const SOUTH_JUNCTION_B_1 = createNode([40.774667, -73.975142, 24.4]);
const SOUTH_JUNCTION_B_2 = createNode([40.775196, -73.974177, 20.2]);
const SOUTH_JUNCTION_B_3 = createNode([40.774554, -73.974043, 21.6]);
createEdge(SOUTH_JUNCTION_B_2, SOUTH_JUNCTION_B_1, edgeSouthJunctionB1);
createEdge(SOUTH_JUNCTION_B_2, SOUTH_JUNCTION_B_3, edgeSouthJunctionB2);
createEdge(SOUTH_JUNCTION_B_3, SOUTH_JUNCTION_B_1, edgeSouthJunctionB3);

const SOUTH_JUNCTION_C_1 = createNode([40.773435, -73.969588, 21.8]);
const SOUTH_JUNCTION_C_2 = createNode([40.773814, -73.969186, 20.8]);
const SOUTH_JUNCTION_C_3 = createNode([40.773182, -73.968955, 24]);
createEdge(SOUTH_JUNCTION_C_2, SOUTH_JUNCTION_C_1, edgeSouthJunctionC1);
createEdge(SOUTH_JUNCTION_C_2, SOUTH_JUNCTION_C_3, edgeSouthJunctionC2);
createEdge(SOUTH_JUNCTION_C_3, SOUTH_JUNCTION_C_1, edgeSouthJunctionC3);

const SOUTH_JUNCTION_D_1 = createNode([40.771178, -73.975689, 40.8]);
const SOUTH_JUNCTION_D_2 = createNode([40.770914, -73.975341, 41]);
const SOUTH_JUNCTION_D_3 = createNode([40.771113, -73.974885, 40.8]);
createEdge(SOUTH_JUNCTION_D_1, SOUTH_JUNCTION_D_2, edgeSouthJunctionD1);
createEdge(SOUTH_JUNCTION_D_3, SOUTH_JUNCTION_D_2, edgeSouthJunctionD2);
createEdge(SOUTH_JUNCTION_D_3, SOUTH_JUNCTION_D_1, edgeSouthJunctionD3);

const SOUTH_JUNCTION_E_1 = createNode([40.768456, -73.979697, 24.2]);
const SOUTH_JUNCTION_E_2 = createNode([40.768505, -73.978801, 20.4]);
const SOUTH_JUNCTION_E_3 = createNode([40.767859, -73.97886, 22]);
createEdge(SOUTH_JUNCTION_E_1, SOUTH_JUNCTION_E_2, edgeSouthJunctionE1);
createEdge(SOUTH_JUNCTION_E_3, SOUTH_JUNCTION_E_2, edgeSouthJunctionE2);
createEdge(SOUTH_JUNCTION_E_1, SOUTH_JUNCTION_E_3, edgeSouthJunctionE3);

const SOUTH_JUNCTION_F_1 = createNode([40.768233, -73.974535, 65.8]);
const SOUTH_JUNCTION_F_2 = createNode([40.767919, -73.973924, 65.6]);
const SOUTH_JUNCTION_F_3 = createNode([40.767828, -73.974311, 65.6]);
createEdge(SOUTH_JUNCTION_F_2, SOUTH_JUNCTION_F_1, edgeSouthJunctionF1);
createEdge(SOUTH_JUNCTION_F_2, SOUTH_JUNCTION_F_3, edgeSouthJunctionF2);
createEdge(SOUTH_JUNCTION_F_1, SOUTH_JUNCTION_F_3, edgeSouthJunctionF3);

// North Edges
createEdge(NORTH_JUNCTION_A_1, NORTH_JUNCTION_C_2, edgeNorth1);
createEdge(NORTH_JUNCTION_E_3, NORTH_JUNCTION_A_2, edgeNorth2);
createEdge(NORTH_JUNCTION_B_1, NORTH_JUNCTION_A_3, edgeNorth3);
createEdge(NORTH_JUNCTION_B_2, NORTH_JUNCTION_D_2, edgeNorth4);
createEdge(NORTH_JUNCTION_B_3, NORTH_JUNCTION_F_3, edgeNorth5);
createEdge(NORTH_JUNCTION_C_3, NORTH_JUNCTION_D_1, edgeNorth6);
createEdge(NORTH_JUNCTION_D_3, PADDOCK_EXIT, edgeNorth7);
createEdge(NORTH_JUNCTION_E_1, NORTH_JUNCTION_F_1, edgeNorth8);

// South Edges
createEdge(SOUTH_JUNCTION_A_3, NORTH_JUNCTION_E_2, edgeSouth1);
createEdge(NORTH_JUNCTION_F_2, SOUTH_JUNCTION_A_2, edgeSouth2);
createEdge(SOUTH_JUNCTION_B_2, NORTH_JUNCTION_C_1, edgeSouth3);
createEdge(PADDOCK_EXIT, SOUTH_JUNCTION_C_2, edgeSouth4);
createEdge(SOUTH_JUNCTION_C_1, SOUTH_JUNCTION_B_3, edgeSouth5);
createEdge(SOUTH_JUNCTION_B_1, SOUTH_JUNCTION_E_1, edgeSouth6);
createEdge(SOUTH_JUNCTION_E_3, SOUTH_JUNCTION_C_3, edgeSouth7);
createEdge(SOUTH_JUNCTION_D_1, SOUTH_JUNCTION_E_2, edgeSouth8);
createEdge(SOUTH_JUNCTION_D_3, SOUTH_JUNCTION_A_1, edgeSouth9);
createEdge(SOUTH_JUNCTION_D_2, SOUTH_JUNCTION_F_1, edgeSouth10);
createEdge(SOUTH_JUNCTION_F_3, SOUTH_JUNCTION_F_2, edgeSouth11);

export default ROADS;
