import { Roads } from "../../../services/Roads";
import edgeTempleKOM from "./edges/temple-kom";
import edgeTempleBypass from "./edges/temple-bypass";
import edgeTempleEntryNorth from "./edges/temple-entry-north";
import edgeTempleEntrySouth from "./edges/temple-entry-south";
import edgePaddockNeokyoExit1 from "./edges/paddock-neokyo-exit-1";
import edgePaddockNeokyoExit2 from "./edges/paddock-neokyo-exit-2";
import edgeNeokyoRoundabout1 from "./edges/neokyo-roundabout-1";
import edgeNeokyoRoundabout2 from "./edges/neokyo-roundabout-2";
import edgeVillageNorth from "./edges/village-north";
import edgeVillageMiddle from "./edges/village-middle";
import edgeVillageSouth from "./edges/village-south";
import edgePaddockToCastle from "./edges/paddock-to-castle";
import {
  edgeCastleSouthA1,
  edgeCastleSouthA2,
  edgeCastleSouthA3,
} from "./edges/castle-south-a";
import {
  edgeCastleSouthB1,
  edgeCastleSouthB2,
  edgeCastleSouthB3,
} from "./edges/castle-south-b";
import edgeCastle1 from "./edges/castle-1";
import edgeCastle2 from "./edges/castle-2";
import edgeCastle3 from "./edges/castle-3";
import edgeCastle4 from "./edges/castle-4";
import edgeCastle5 from "./edges/castle-5";
import edgeCastle6 from "./edges/castle-6";
import edgeCastle7 from "./edges/castle-7";

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

// Village
const VILLAGE_EAST = ROADS.createNode([-10.746258, 165.844588, 153.6]);
const VILLAGE_WEST = ROADS.createNode([-10.748485, 165.842115, 153.6]);
ROADS.createEdge(VILLAGE_WEST, VILLAGE_EAST, edgeVillageNorth);
ROADS.createEdge(VILLAGE_WEST, VILLAGE_EAST, edgeVillageMiddle);
ROADS.createEdge(VILLAGE_EAST, VILLAGE_WEST, edgeVillageSouth);

// Castle
const CASTLE_NORTH_A = ROADS.createNode([-10.755473, 165.848247, 194.8]);
const CASTLE_NORTH_B = ROADS.createNode([-10.757028, 165.84792, 0]);
const CASTLE_MIDDLE = ROADS.createNode([-10.760925, 165.846452, 0]);

const CASTLE_SOUTH_A_1 = ROADS.createNode([-10.764166, 165.844988, 0]);
const CASTLE_SOUTH_A_2 = ROADS.createNode([-10.7638, 165.845079, 0]);
const CASTLE_SOUTH_A_3 = ROADS.createNode([-10.763876, 165.845286, 0]);
ROADS.createEdge(CASTLE_SOUTH_A_2, CASTLE_SOUTH_A_1, edgeCastleSouthA1);
ROADS.createEdge(CASTLE_SOUTH_A_2, CASTLE_SOUTH_A_3, edgeCastleSouthA2);
ROADS.createEdge(CASTLE_SOUTH_A_3, CASTLE_SOUTH_A_1, edgeCastleSouthA3);

const CASTLE_SOUTH_B_1 = ROADS.createNode([-10.762461, 165.84542, 159.4]);
const CASTLE_SOUTH_B_2 = ROADS.createNode([-10.762595, 165.845731, 159.2]);
const CASTLE_SOUTH_B_3 = ROADS.createNode([-10.762798, 165.845463, 159.2]);
ROADS.createEdge(CASTLE_SOUTH_B_2, CASTLE_SOUTH_B_1, edgeCastleSouthB1);
ROADS.createEdge(CASTLE_SOUTH_B_2, CASTLE_SOUTH_B_3, edgeCastleSouthB2);
ROADS.createEdge(CASTLE_SOUTH_B_1, CASTLE_SOUTH_B_3, edgeCastleSouthB3);

ROADS.createEdge(CASTLE_NORTH_B, CASTLE_NORTH_A, edgeCastle1);
ROADS.createEdge(TEMPLE_ENTRY_SOUTH, CASTLE_NORTH_B, edgeCastle2);
ROADS.createEdge(CASTLE_MIDDLE, CASTLE_NORTH_B, edgeCastle3);
ROADS.createEdge(TEMPLE_ENTRY_SOUTH, CASTLE_MIDDLE, edgeCastle4);
ROADS.createEdge(CASTLE_MIDDLE, CASTLE_SOUTH_A_3, edgeCastle5);
ROADS.createEdge(CASTLE_SOUTH_B_3, CASTLE_SOUTH_A_2, edgeCastle6);
ROADS.createEdge(CASTLE_NORTH_A, CASTLE_SOUTH_B_2, edgeCastle7);

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

// Neokyo Roundabout
const NEOKYO_ROUNDABOUT_1 = ROADS.createNode([-10.780663, 165.833776, 125.6]);
const NEOKYO_ROUNDABOUT_2 = ROADS.createNode([-10.781122, 165.835375, 125.6]);
ROADS.createEdge(
  NEOKYO_ROUNDABOUT_2,
  NEOKYO_ROUNDABOUT_1,
  edgeNeokyoRoundabout1
);
ROADS.createEdge(
  NEOKYO_ROUNDABOUT_1,
  NEOKYO_ROUNDABOUT_2,
  edgeNeokyoRoundabout2
);

// Other
ROADS.createEdge(CASTLE_SOUTH_A_1, PADDOCK_SOUTH_EXIT, edgePaddockToCastle);

export default ROADS;
