import { Roads } from "../../../services/Roads";
import edgeTempleKOM from "./edges/temple-kom";
import edgeTempleBypass from "./edges/temple-bypass";
import edgeTempleEntryNorth from "./edges/temple-entry-north";
import edgeTempleEntrySouth from "./edges/temple-entry-south";

const ROADS = new Roads();

// Temple
const TEMPLE_ENTRY_NORTH = ROADS.createNode([-10.747792, 165.854824, 190.6]);
const TEMPLE_ENTRY_SOUTH = ROADS.createNode([-10.758005, 165.849271, 197]);
const TEMPLE_BYPASS_NORTH = ROADS.createNode([-10.751153, 165.857172, 212.6]);
const TEMPLE_BYPASS_SOUTH = ROADS.createNode([-10.756155, 165.85237, 226.6]);
ROADS.createEdge(TEMPLE_BYPASS_SOUTH, TEMPLE_BYPASS_NORTH, edgeTempleKOM);
ROADS.createEdge(TEMPLE_BYPASS_NORTH, TEMPLE_BYPASS_SOUTH, edgeTempleBypass);
ROADS.createEdge(TEMPLE_ENTRY_NORTH, TEMPLE_BYPASS_NORTH, edgeTempleEntryNorth);
ROADS.createEdge(TEMPLE_BYPASS_SOUTH, TEMPLE_ENTRY_SOUTH, edgeTempleEntrySouth);

// Paddock South
const PADDOCK_SOUTH_1 = ROADS.createNode([-10.768962, 165.845801, 0]);
const PADDOCK_SOUTH_2 = ROADS.createNode([-10.767547, 165.846865, 0]);
const PADDOCK_SOUTH_3 = ROADS.createNode([-10.769357, 165.846337, 0]);
const PADDOCK_SOUTH_4 = ROADS.createNode([-10.767971, 165.847421, 0]);
const PADDOCK_SOUTH_MIDDLE = ROADS.createNode([-10.768951, 165.84726, 0]);
const PADDOCK_SOUTH_ROW_FRONT = ROADS.createNode([-10.767805, 165.845736, 0]);
const PADDOCK_SOUTH_ROW_BACK = ROADS.createNode([-10.768216, 165.846291, 0]);
const PADDOCK_SOUTH_EXIT = ROADS.createNode([-10.767157, 165.844875, 0]);
ROADS.createEdge(PADDOCK_SOUTH_1, PADDOCK_SOUTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_SOUTH_2, PADDOCK_SOUTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_SOUTH_3, PADDOCK_SOUTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_SOUTH_4, PADDOCK_SOUTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_SOUTH_MIDDLE, PADDOCK_SOUTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_SOUTH_ROW_BACK, PADDOCK_SOUTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_SOUTH_ROW_FRONT, PADDOCK_SOUTH_EXIT, []);

export default ROADS;
