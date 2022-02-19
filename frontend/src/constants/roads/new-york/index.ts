import { Roads } from "../../../services/Roads";
import edgeNorth1 from "./edges/north-1";
import edgeNorth2 from "./edges/north-2";
import edgeNorth3 from "./edges/north-3";
import edgeNorth4 from "./edges/north-4";
import edgeNorth5 from "./edges/north-5";
import edgeNorth6 from "./edges/north-6";
import edgeNorth7 from "./edges/north-7";
import edgeNorth8 from "./edges/north-8";
import edgeSouth1 from "./edges/south-1";
import edgeSouth2 from "./edges/south-2";
import edgeSouth3 from "./edges/south-3";
import edgeSouth4 from "./edges/south-4";
import edgeSouth5 from "./edges/south-5";
import edgeSouth6 from "./edges/south-6";
import edgeSouth7 from "./edges/south-7";
import edgeSouth8 from "./edges/south-8";
import edgeSouth9 from "./edges/south-9";
import edgeSouth10 from "./edges/south-10";
import edgeSouth11 from "./edges/south-11";

const ROADS = new Roads();

// Paddock
const PADDOCK_EXIT = ROADS.createNode([40.777649, -73.966935, 33.6]);
const PADDOCK_ROW_BACK = ROADS.createNode([40.777877, -73.969241, 33.6]);
const PADDOCK_ROW_FRONT = ROADS.createNode([40.777804, -73.968287, 33.6]);
const PADDOCK_1 = ROADS.createNode([40.77708, -73.969456, 33.6]);
const PADDOCK_2 = ROADS.createNode([40.778681, -73.969113, 33.6]);
const PADDOCK_3 = ROADS.createNode([40.777194, -73.970346, 33.6]);
const PADDOCK_4 = ROADS.createNode([40.778819, -73.970014, 33.6]);
const PADDOCK_CENTER = ROADS.createNode([40.778015, -73.970475, 33.6]);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);

// North Nodes
const NORTH_JUNCTION_A_1 = ROADS.createNode([40.798365, -73.958125, 0]);
const NORTH_JUNCTION_A_2 = ROADS.createNode([40.798221, -73.959115, 0]);
const NORTH_JUNCTION_A_3 = ROADS.createNode([40.799062, -73.95849, 0]);
ROADS.createEdge(NORTH_JUNCTION_A_1, NORTH_JUNCTION_A_2, []);
ROADS.createEdge(NORTH_JUNCTION_A_2, NORTH_JUNCTION_A_3, []);
ROADS.createEdge(NORTH_JUNCTION_A_3, NORTH_JUNCTION_A_1, []);

const NORTH_JUNCTION_B_1 = ROADS.createNode([40.798473, -73.954352, 0]);
const NORTH_JUNCTION_B_2 = ROADS.createNode([40.797977, -73.954256, 0]);
const NORTH_JUNCTION_B_3 = ROADS.createNode([40.798209, -73.953601, 0]);
ROADS.createEdge(NORTH_JUNCTION_B_1, NORTH_JUNCTION_B_2, []);
ROADS.createEdge(NORTH_JUNCTION_B_2, NORTH_JUNCTION_B_3, []);
ROADS.createEdge(NORTH_JUNCTION_B_3, NORTH_JUNCTION_B_1, []);

const NORTH_JUNCTION_C_1 = ROADS.createNode([40.794241, -73.95962, 0]);
const NORTH_JUNCTION_C_2 = ROADS.createNode([40.794617, -73.95926, 0]);
const NORTH_JUNCTION_C_3 = ROADS.createNode([40.794198, -73.959089, 0]);
ROADS.createEdge(NORTH_JUNCTION_C_1, NORTH_JUNCTION_C_2, []);
ROADS.createEdge(NORTH_JUNCTION_C_2, NORTH_JUNCTION_C_3, []);
ROADS.createEdge(NORTH_JUNCTION_C_3, NORTH_JUNCTION_C_1, []);

const NORTH_JUNCTION_D_1 = ROADS.createNode([40.794459, -73.955277, 0]);
const NORTH_JUNCTION_D_2 = ROADS.createNode([40.794623, -73.954567, 0]);
const NORTH_JUNCTION_D_3 = ROADS.createNode([40.793985, -73.954943, 0]);
ROADS.createEdge(NORTH_JUNCTION_D_1, NORTH_JUNCTION_D_2, []);
ROADS.createEdge(NORTH_JUNCTION_D_2, NORTH_JUNCTION_D_3, []);
ROADS.createEdge(NORTH_JUNCTION_D_3, NORTH_JUNCTION_D_1, []);

const NORTH_JUNCTION_E_1 = ROADS.createNode([40.791709, -73.961053, 0]);
const NORTH_JUNCTION_E_2 = ROADS.createNode([40.791354, -73.961417, 0]);
const NORTH_JUNCTION_E_3 = ROADS.createNode([40.792012, -73.961479, 0]);
ROADS.createEdge(NORTH_JUNCTION_E_1, NORTH_JUNCTION_E_2, []);
ROADS.createEdge(NORTH_JUNCTION_E_2, NORTH_JUNCTION_E_3, []);
ROADS.createEdge(NORTH_JUNCTION_E_3, NORTH_JUNCTION_E_1, []);

const NORTH_JUNCTION_F_1 = ROADS.createNode([40.78847, -73.958695, 0]);
const NORTH_JUNCTION_F_2 = ROADS.createNode([40.787964, -73.958486, 0]);
const NORTH_JUNCTION_F_3 = ROADS.createNode([40.788575, -73.958038, 0]);
ROADS.createEdge(NORTH_JUNCTION_F_1, NORTH_JUNCTION_F_2, []);
ROADS.createEdge(NORTH_JUNCTION_F_2, NORTH_JUNCTION_F_3, []);
ROADS.createEdge(NORTH_JUNCTION_F_3, NORTH_JUNCTION_F_1, []);

// South Nodes
const SOUTH_JUNCTION_A_1 = ROADS.createNode([40.782047, -73.967935, 0]);
const SOUTH_JUNCTION_A_2 = ROADS.createNode([40.782279, -73.967396, 0]);
const SOUTH_JUNCTION_A_3 = ROADS.createNode([40.782681, -73.967726, 0]);
ROADS.createEdge(SOUTH_JUNCTION_A_1, SOUTH_JUNCTION_A_2, []);
ROADS.createEdge(SOUTH_JUNCTION_A_2, SOUTH_JUNCTION_A_3, []);
ROADS.createEdge(SOUTH_JUNCTION_A_3, SOUTH_JUNCTION_A_1, []);

const SOUTH_JUNCTION_B_1 = ROADS.createNode([40.774667, -73.975142, 0]);
const SOUTH_JUNCTION_B_2 = ROADS.createNode([40.775196, -73.974177, 0]);
const SOUTH_JUNCTION_B_3 = ROADS.createNode([40.774554, -73.974043, 0]);
ROADS.createEdge(SOUTH_JUNCTION_B_1, SOUTH_JUNCTION_B_2, []);
ROADS.createEdge(SOUTH_JUNCTION_B_2, SOUTH_JUNCTION_B_3, []);
ROADS.createEdge(SOUTH_JUNCTION_B_3, SOUTH_JUNCTION_B_1, []);

const SOUTH_JUNCTION_C_1 = ROADS.createNode([40.773435, -73.969588, 0]);
const SOUTH_JUNCTION_C_2 = ROADS.createNode([40.773814, -73.969186, 0]);
const SOUTH_JUNCTION_C_3 = ROADS.createNode([40.773182, -73.968955, 0]);
ROADS.createEdge(SOUTH_JUNCTION_C_1, SOUTH_JUNCTION_C_2, []);
ROADS.createEdge(SOUTH_JUNCTION_C_2, SOUTH_JUNCTION_C_3, []);
ROADS.createEdge(SOUTH_JUNCTION_C_3, SOUTH_JUNCTION_C_1, []);

const SOUTH_JUNCTION_D_1 = ROADS.createNode([40.771178, -73.975689, 0]);
const SOUTH_JUNCTION_D_2 = ROADS.createNode([40.770914, -73.975341, 0]);
const SOUTH_JUNCTION_D_3 = ROADS.createNode([40.771113, -73.974885, 0]);
ROADS.createEdge(SOUTH_JUNCTION_D_1, SOUTH_JUNCTION_D_2, []);
ROADS.createEdge(SOUTH_JUNCTION_D_2, SOUTH_JUNCTION_D_3, []);
ROADS.createEdge(SOUTH_JUNCTION_D_3, SOUTH_JUNCTION_D_1, []);

const SOUTH_JUNCTION_E_1 = ROADS.createNode([40.768456, -73.979697, 0]);
const SOUTH_JUNCTION_E_2 = ROADS.createNode([40.768505, -73.978801, 0]);
const SOUTH_JUNCTION_E_3 = ROADS.createNode([40.767859, -73.97886, 0]);
ROADS.createEdge(SOUTH_JUNCTION_E_1, SOUTH_JUNCTION_E_2, []);
ROADS.createEdge(SOUTH_JUNCTION_E_2, SOUTH_JUNCTION_E_3, []);
ROADS.createEdge(SOUTH_JUNCTION_E_3, SOUTH_JUNCTION_E_1, []);

const SOUTH_JUNCTION_F_1 = ROADS.createNode([40.768233, -73.974535, 0]);
const SOUTH_JUNCTION_F_2 = ROADS.createNode([40.767919, -73.973924, 0]);
const SOUTH_JUNCTION_F_3 = ROADS.createNode([40.767828, -73.974311, 0]);
ROADS.createEdge(SOUTH_JUNCTION_F_1, SOUTH_JUNCTION_F_2, []);
ROADS.createEdge(SOUTH_JUNCTION_F_2, SOUTH_JUNCTION_F_3, []);
ROADS.createEdge(SOUTH_JUNCTION_F_3, SOUTH_JUNCTION_F_1, []);

// North Edges
ROADS.createEdge(NORTH_JUNCTION_A_1, NORTH_JUNCTION_C_2, edgeNorth1);
ROADS.createEdge(NORTH_JUNCTION_E_3, NORTH_JUNCTION_A_2, edgeNorth2);
ROADS.createEdge(NORTH_JUNCTION_B_1, NORTH_JUNCTION_A_3, edgeNorth3);
ROADS.createEdge(NORTH_JUNCTION_B_2, NORTH_JUNCTION_D_2, edgeNorth4);
ROADS.createEdge(NORTH_JUNCTION_B_3, NORTH_JUNCTION_F_3, edgeNorth5);
ROADS.createEdge(NORTH_JUNCTION_C_3, NORTH_JUNCTION_D_1, edgeNorth6);
ROADS.createEdge(NORTH_JUNCTION_D_3, PADDOCK_EXIT, edgeNorth7);
ROADS.createEdge(NORTH_JUNCTION_E_1, NORTH_JUNCTION_F_1, edgeNorth8);

// South Edges
ROADS.createEdge(SOUTH_JUNCTION_A_3, NORTH_JUNCTION_E_2, edgeSouth1);
ROADS.createEdge(NORTH_JUNCTION_F_2, SOUTH_JUNCTION_A_2, edgeSouth2);
ROADS.createEdge(SOUTH_JUNCTION_B_2, NORTH_JUNCTION_C_1, edgeSouth3);
ROADS.createEdge(PADDOCK_EXIT, SOUTH_JUNCTION_C_2, edgeSouth4);
ROADS.createEdge(SOUTH_JUNCTION_C_1, SOUTH_JUNCTION_B_3, edgeSouth5);
ROADS.createEdge(SOUTH_JUNCTION_B_1, SOUTH_JUNCTION_E_1, edgeSouth6);
ROADS.createEdge(SOUTH_JUNCTION_E_3, SOUTH_JUNCTION_C_3, edgeSouth7);
ROADS.createEdge(SOUTH_JUNCTION_D_1, SOUTH_JUNCTION_E_2, edgeSouth8);
ROADS.createEdge(SOUTH_JUNCTION_D_3, SOUTH_JUNCTION_A_1, edgeSouth9);
ROADS.createEdge(SOUTH_JUNCTION_D_2, SOUTH_JUNCTION_F_1, edgeSouth10);
ROADS.createEdge(SOUTH_JUNCTION_F_3, SOUTH_JUNCTION_F_2, edgeSouth11);

export default ROADS;
