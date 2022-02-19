import { Roads } from "../../../services/Roads";
import edgeTempleKOM from "./edges/temple-kom";
import edgeTempleBypass from "./edges/temple-bypass";
import edgeTempleEntryNorth from "./edges/temple-entry-north";
import edgeTempleEntrySouth from "./edges/temple-entry-south";
import edgePaddockNeokyoExit1 from "./edges/paddock-neokyo-exit-1";
import edgePaddockNeokyoExit2 from "./edges/paddock-neokyo-exit-2";

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

// Paddock North
const PADDOCK_NORTH_1 = ROADS.createNode([-10.743354, 165.850334, 0]);
const PADDOCK_NORTH_2 = ROADS.createNode([-10.742885, 165.852088, 0]);
const PADDOCK_NORTH_3 = ROADS.createNode([-10.742716, 165.850183, 0]);
const PADDOCK_NORTH_4 = ROADS.createNode([-10.742231, 165.851895, 0]);
const PADDOCK_NORTH_MIDDLE = ROADS.createNode([-10.742026, 165.850902, 0]);
const PADDOCK_NORTH_ROW_FRONT = ROADS.createNode([-10.743855, 165.851428, 0]);
const PADDOCK_NORTH_ROW_BACK = ROADS.createNode([-10.74319, 165.851251, 0]);
const PADDOCK_NORTH_EXIT = ROADS.createNode([-10.744888, 165.851723, 0]);
ROADS.createEdge(PADDOCK_NORTH_1, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_2, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_3, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_4, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_MIDDLE, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_ROW_BACK, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_ROW_FRONT, PADDOCK_NORTH_EXIT, []);

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

// Paddock Neokyo
const PADDOCK_NEOKYO_1 = ROADS.createNode([-10.781435, 165.842088, 126.4]);
const PADDOCK_NEOKYO_2 = ROADS.createNode([-10.781446, 165.8438, 126.4]);
const PADDOCK_NEOKYO_3 = ROADS.createNode([-10.780777, 165.842094, 126.4]);
const PADDOCK_NEOKYO_4 = ROADS.createNode([-10.780777, 165.843816, 126.4]);
const PADDOCK_NEOKYO_MIDDLE = ROADS.createNode([-10.780276, 165.842995, 126.4]);
const PADDOCK_NEOKYO_ROW_FRONT = ROADS.createNode([
  -10.782184, 165.843006, 126.4,
]);
const PADDOCK_NEOKYO_ROW_BACK = ROADS.createNode([
  -10.781477, 165.842995, 126.4,
]);
const PADDOCK_NEOKYO_EXIT_1 = ROADS.createNode([-10.782895, 165.843006, 126.4]);
const PADDOCK_NEOKYO_EXIT_2 = ROADS.createNode([-10.783338, 165.843019, 126.4]);
const PADDOCK_NEOKYO_EXIT_3 = ROADS.createNode([-10.783169, 165.842577, 126.4]);
ROADS.createEdge(PADDOCK_NEOKYO_1, PADDOCK_NEOKYO_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_2, PADDOCK_NEOKYO_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_3, PADDOCK_NEOKYO_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NEOKYO_4, PADDOCK_NEOKYO_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NEOKYO_MIDDLE, PADDOCK_NEOKYO_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NEOKYO_ROW_BACK, PADDOCK_NEOKYO_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_ROW_FRONT, PADDOCK_NEOKYO_EXIT_1, []);
ROADS.createEdge(PADDOCK_NEOKYO_EXIT_1, PADDOCK_NEOKYO_EXIT_2, []);
ROADS.createEdge(
  PADDOCK_NEOKYO_EXIT_3,
  PADDOCK_NEOKYO_EXIT_2,
  edgePaddockNeokyoExit1
);
ROADS.createEdge(
  PADDOCK_NEOKYO_EXIT_1,
  PADDOCK_NEOKYO_EXIT_3,
  edgePaddockNeokyoExit2
);

export default ROADS;
