import { Roads } from "../../../services/Roads";
import edgeCastle1 from "./edges/castle-1";
import edgeCastle2 from "./edges/castle-2";
import edgeCastle3 from "./edges/castle-3";
import edgeCastle4 from "./edges/castle-4";
import edgeCastle5 from "./edges/castle-5";
import edgeCastle6 from "./edges/castle-6";
import edgeCastle7 from "./edges/castle-7";
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
import edgeCountryAToB from "./edges/country-a-to-b";
import edgeCountryBToCastle from "./edges/country-b-to-castle";
import edgeCountryBToTemple from "./edges/country-b-to-temple";
import edgeCountryCToE from "./edges/country-c-to-e";
import edgeCountryCToF from "./edges/country-c-to-f";
import edgeCountryCToVillage from "./edges/country-c-to-village";
import edgeCountryCastleToE from "./edges/country-castle-to-e";
import edgeCountryDToE from "./edges/country-d-to-e";
import edgeCountryDToF from "./edges/country-d-to-f";
import edgeCountryDToPaddock from "./edges/country-d-to-paddock";
import { edgeCountryE1, edgeCountryE2, edgeCountryE3 } from "./edges/country-e";
import edgeCountryNeokyo from "./edges/country-neokyo";
import edgeCountryPaddockToA from "./edges/country-paddock-to-a";
import edgeCountryPaddockToTemple from "./edges/country-paddock-to-temple";
import edgeCountryVillageToA from "./edges/country-village-to-a";
import edgeNeokyoRoundabout1 from "./edges/neokyo-roundabout-1";
import edgeNeokyoRoundabout2 from "./edges/neokyo-roundabout-2";
import edgePaddockNeokyoExit1 from "./edges/paddock-neokyo-exit-1";
import edgePaddockNeokyoExit2 from "./edges/paddock-neokyo-exit-2";
import edgePaddockToCastle from "./edges/paddock-to-castle";
import edgeTempleBypass from "./edges/temple-bypass";
import edgeTempleEntryNorth from "./edges/temple-entry-north";
import edgeTempleEntrySouth from "./edges/temple-entry-south";
import edgeTempleKOM from "./edges/temple-kom";
import edgeVillageMiddle from "./edges/village-middle";
import edgeVillageNorth from "./edges/village-north";
import edgeVillageSouth from "./edges/village-south";
import edgeNeokyoRooftop from "./edges/neokyo-rooftop";
import edgeNeokyoRooftopJunction1 from "./edges/neokyo-rooftop-junction-1";
import edgeNeokyoRooftopJunction2 from "./edges/neokyo-rooftop-junction-2";
import edgeNeokyoRooftopJunction3 from "./edges/neokyo-rooftop-junction-3";
import edgeNeokyoRooftopJunction4 from "./edges/neokyo-rooftop-junction-4";
import edgeNeokyoCastle from "./edges/neokyo-castle";
import {
  edgeNeokyoCastleNorth1,
  edgeNeokyoCastleNorth2,
  edgeNeokyoCastleNorth3,
} from "./edges/neokyo-castle-north";
import {
  edgeNeokyoCastleSouth1,
  edgeNeokyoCastleSouth2,
  edgeNeokyoCastleSouth3,
} from "./edges/neokyo-castle-south";

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
const PADDOCK_NORTH_1 = ROADS.createNode([-10.743354, 165.850334, 169]);
const PADDOCK_NORTH_2 = ROADS.createNode([-10.742885, 165.852088, 169]);
const PADDOCK_NORTH_3 = ROADS.createNode([-10.742716, 165.850183, 169]);
const PADDOCK_NORTH_4 = ROADS.createNode([-10.742231, 165.851895, 169]);
const PADDOCK_NORTH_MIDDLE = ROADS.createNode([-10.742026, 165.850902, 169]);
const PADDOCK_NORTH_ROW_FRONT = ROADS.createNode([-10.743855, 165.851428, 169]);
const PADDOCK_NORTH_ROW_BACK = ROADS.createNode([-10.74319, 165.851251, 169]);
const PADDOCK_NORTH_EXIT = ROADS.createNode([-10.744888, 165.851723, 169]);
ROADS.createEdge(PADDOCK_NORTH_1, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_2, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_3, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_4, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_MIDDLE, PADDOCK_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NORTH_ROW_BACK, PADDOCK_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NORTH_ROW_FRONT, PADDOCK_NORTH_EXIT, []);

// Paddock South
const PADDOCK_SOUTH_1 = ROADS.createNode([-10.768962, 165.845801, 143.8]);
const PADDOCK_SOUTH_2 = ROADS.createNode([-10.767547, 165.846865, 143.8]);
const PADDOCK_SOUTH_3 = ROADS.createNode([-10.769357, 165.846337, 143.8]);
const PADDOCK_SOUTH_4 = ROADS.createNode([-10.767971, 165.847421, 143.8]);
const PADDOCK_SOUTH_MIDDLE = ROADS.createNode([-10.768951, 165.84726, 143.8]);
const PADDOCK_SOUTH_ROW_FRONT = ROADS.createNode([
  -10.767805, 165.845736, 143.8,
]);
const PADDOCK_SOUTH_ROW_BACK = ROADS.createNode([
  -10.768216, 165.846291, 143.8,
]);
const PADDOCK_SOUTH_EXIT = ROADS.createNode([-10.767157, 165.844875, 143.8]);
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
const CASTLE_NORTH_B = ROADS.createNode([-10.757028, 165.84792, 196.2]);
const CASTLE_MIDDLE = ROADS.createNode([-10.760925, 165.846452, 196]);

const CASTLE_SOUTH_A_1 = ROADS.createNode([-10.764166, 165.844988, 162.4]);
const CASTLE_SOUTH_A_2 = ROADS.createNode([-10.7638, 165.845079, 162.4]);
const CASTLE_SOUTH_A_3 = ROADS.createNode([-10.763876, 165.845286, 162.2]);
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

// Countryside Rest
const COUNTRY_A = ROADS.createNode([-10.746116, 165.846959, 160.6]);
const COUNTRY_B = ROADS.createNode([-10.750822, 165.852141, 192.8]);
const COUNTRY_C = ROADS.createNode([-10.758184, 165.834066, 128]);
const COUNTRY_D = ROADS.createNode([-10.769018, 165.84151, 129.8]);
const COUNTRY_F = ROADS.createNode([-10.775112, 165.83019, 125.6]);

const COUNTRY_E_1 = ROADS.createNode([-10.759273, 165.838325, 128.2]);
const COUNTRY_E_2 = ROADS.createNode([-10.759217, 165.838872, 128.2]);
const COUNTRY_E_3 = ROADS.createNode([-10.759507, 165.838604, 128.2]);
ROADS.createEdge(COUNTRY_E_1, COUNTRY_E_2, edgeCountryE1);
ROADS.createEdge(COUNTRY_E_2, COUNTRY_E_3, edgeCountryE2);
ROADS.createEdge(COUNTRY_E_3, COUNTRY_E_1, edgeCountryE3);

ROADS.createEdge(CASTLE_SOUTH_A_1, PADDOCK_SOUTH_EXIT, edgePaddockToCastle);
ROADS.createEdge(VILLAGE_EAST, COUNTRY_A, edgeCountryVillageToA);
ROADS.createEdge(COUNTRY_A, PADDOCK_NORTH_EXIT, edgeCountryPaddockToA);
ROADS.createEdge(
  PADDOCK_NORTH_EXIT,
  TEMPLE_ENTRY_NORTH,
  edgeCountryPaddockToTemple
);
ROADS.createEdge(COUNTRY_B, COUNTRY_A, edgeCountryAToB);
ROADS.createEdge(COUNTRY_B, TEMPLE_ENTRY_NORTH, edgeCountryBToTemple);
ROADS.createEdge(CASTLE_NORTH_A, COUNTRY_B, edgeCountryBToCastle);
ROADS.createEdge(COUNTRY_C, COUNTRY_E_1, edgeCountryCToE);
ROADS.createEdge(COUNTRY_E_2, CASTLE_SOUTH_B_1, edgeCountryCastleToE);
ROADS.createEdge(COUNTRY_D, COUNTRY_E_3, edgeCountryDToE);
ROADS.createEdge(PADDOCK_SOUTH_EXIT, COUNTRY_D, edgeCountryDToPaddock);
ROADS.createEdge(COUNTRY_C, VILLAGE_WEST, edgeCountryCToVillage);
ROADS.createEdge(COUNTRY_D, COUNTRY_F, edgeCountryDToF);
ROADS.createEdge(COUNTRY_F, COUNTRY_C, edgeCountryCToF);

// Paddock Neokyo North
const PADDOCK_NEOKYO_NORTH_1 = ROADS.createNode([
  -10.781435, 165.842088, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_2 = ROADS.createNode([-10.781446, 165.8438, 126.4]);
const PADDOCK_NEOKYO_NORTH_3 = ROADS.createNode([
  -10.780777, 165.842094, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_4 = ROADS.createNode([
  -10.780777, 165.843816, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_MIDDLE = ROADS.createNode([
  -10.780276, 165.842995, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_ROW_FRONT = ROADS.createNode([
  -10.782184, 165.843006, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_ROW_BACK = ROADS.createNode([
  -10.781477, 165.842995, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_EXIT_1 = ROADS.createNode([
  -10.782895, 165.843006, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_EXIT_2 = ROADS.createNode([
  -10.783338, 165.843019, 126.4,
]);
const PADDOCK_NEOKYO_NORTH_EXIT_3 = ROADS.createNode([
  -10.783169, 165.842577, 126.4,
]);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_1, PADDOCK_NEOKYO_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_2, PADDOCK_NEOKYO_NORTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_3, PADDOCK_NEOKYO_NORTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_4, PADDOCK_NEOKYO_NORTH_ROW_BACK, []);
ROADS.createEdge(
  PADDOCK_NEOKYO_NORTH_MIDDLE,
  PADDOCK_NEOKYO_NORTH_ROW_BACK,
  []
);
ROADS.createEdge(
  PADDOCK_NEOKYO_NORTH_ROW_BACK,
  PADDOCK_NEOKYO_NORTH_ROW_FRONT,
  []
);
ROADS.createEdge(
  PADDOCK_NEOKYO_NORTH_ROW_FRONT,
  PADDOCK_NEOKYO_NORTH_EXIT_1,
  []
);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_EXIT_1, PADDOCK_NEOKYO_NORTH_EXIT_2, []);
ROADS.createEdge(
  PADDOCK_NEOKYO_NORTH_EXIT_3,
  PADDOCK_NEOKYO_NORTH_EXIT_2,
  edgePaddockNeokyoExit1
);
ROADS.createEdge(
  PADDOCK_NEOKYO_NORTH_EXIT_1,
  PADDOCK_NEOKYO_NORTH_EXIT_3,
  edgePaddockNeokyoExit2
);

// Paddock Neokyo South
const PADDOCK_NEOKYO_SOUTH_1 = ROADS.createNode([-10.807506, 165.838333, 0]);
const PADDOCK_NEOKYO_SOUTH_2 = ROADS.createNode([-10.807008, 165.840053, 0]);
const PADDOCK_NEOKYO_SOUTH_3 = ROADS.createNode([-10.808149, 165.838532, 0]);
const PADDOCK_NEOKYO_SOUTH_4 = ROADS.createNode([-10.807654, 165.840246, 0]);
const PADDOCK_NEOKYO_SOUTH_MIDDLE = ROADS.createNode([
  -10.808323, 165.839514, 0,
]);
const PADDOCK_NEOKYO_SOUTH_ROW_BACK = ROADS.createNode([
  -10.807169, 165.839159, 0,
]);
const PADDOCK_NEOKYO_SOUTH_ROW_FRONT = ROADS.createNode([
  -10.806521, 165.838969, 0,
]);
const PADDOCK_NEOKYO_SOUTH_EXIT = ROADS.createNode([-10.805406, 165.838655, 0]);
ROADS.createEdge(
  PADDOCK_NEOKYO_SOUTH_MIDDLE,
  PADDOCK_NEOKYO_SOUTH_ROW_BACK,
  []
);
ROADS.createEdge(
  PADDOCK_NEOKYO_SOUTH_ROW_BACK,
  PADDOCK_NEOKYO_SOUTH_ROW_FRONT,
  []
);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_ROW_FRONT, PADDOCK_NEOKYO_SOUTH_EXIT, []);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_1, PADDOCK_NEOKYO_SOUTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_2, PADDOCK_NEOKYO_SOUTH_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_3, PADDOCK_NEOKYO_SOUTH_ROW_BACK, []);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_4, PADDOCK_NEOKYO_SOUTH_ROW_BACK, []);

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

// Neokyo Rooftop
const NEOKYO_ROOFTOP_1 = ROADS.createNode([-10.789693, 165.846608, 140]);
const NEOKYO_ROOFTOP_2 = ROADS.createNode([-10.7892, 165.84624, 140]);
const NEOKYO_ROOFTOP_3 = ROADS.createNode([-10.788958, 165.846707, 140]);
const NEOKYO_ROOFTOP_4 = ROADS.createNode([-10.789395, 165.847005, 140]);
ROADS.createEdge(NEOKYO_ROOFTOP_3, NEOKYO_ROOFTOP_4, edgeNeokyoRooftop);
ROADS.createEdge(
  NEOKYO_ROOFTOP_4,
  NEOKYO_ROOFTOP_1,
  edgeNeokyoRooftopJunction1
);
ROADS.createEdge(
  NEOKYO_ROOFTOP_2,
  NEOKYO_ROOFTOP_3,
  edgeNeokyoRooftopJunction2
);
ROADS.createEdge(
  NEOKYO_ROOFTOP_2,
  NEOKYO_ROOFTOP_1,
  edgeNeokyoRooftopJunction3
);
ROADS.createEdge(
  NEOKYO_ROOFTOP_3,
  NEOKYO_ROOFTOP_4,
  edgeNeokyoRooftopJunction4
);

// Neokyo Castle
const NEOKYO_CASTLE_NORTH_1 = ROADS.createNode([-10.799473, 165.842966, 126.6]);
const NEOKYO_CASTLE_NORTH_2 = ROADS.createNode([-10.799225, 165.842721, 126.4]);
const NEOKYO_CASTLE_NORTH_3 = ROADS.createNode([-10.799083, 165.842987, 126.4]);
ROADS.createEdge(
  NEOKYO_CASTLE_NORTH_2,
  NEOKYO_CASTLE_NORTH_1,
  edgeNeokyoCastleNorth1
);
ROADS.createEdge(
  NEOKYO_CASTLE_NORTH_2,
  NEOKYO_CASTLE_NORTH_3,
  edgeNeokyoCastleNorth2
);
ROADS.createEdge(
  NEOKYO_CASTLE_NORTH_3,
  NEOKYO_CASTLE_NORTH_1,
  edgeNeokyoCastleNorth3
);

const NEOKYO_CASTLE_SOUTH_1 = ROADS.createNode([-10.803689, 165.843738, 125.6]);
const NEOKYO_CASTLE_SOUTH_2 = ROADS.createNode([-10.803578, 165.844116, 125.6]);
const NEOKYO_CASTLE_SOUTH_3 = ROADS.createNode([-10.803451, 165.843867, 0]);
ROADS.createEdge(
  NEOKYO_CASTLE_SOUTH_1,
  NEOKYO_CASTLE_SOUTH_2,
  edgeNeokyoCastleSouth1
);
ROADS.createEdge(
  NEOKYO_CASTLE_SOUTH_3,
  NEOKYO_CASTLE_SOUTH_2,
  edgeNeokyoCastleSouth2
);
ROADS.createEdge(
  NEOKYO_CASTLE_SOUTH_3,
  NEOKYO_CASTLE_SOUTH_1,
  edgeNeokyoCastleSouth3
);

ROADS.createEdge(
  NEOKYO_CASTLE_NORTH_1,
  NEOKYO_CASTLE_SOUTH_3,
  edgeNeokyoCastle
);

// Neokyo Rest
ROADS.createEdge(COUNTRY_F, NEOKYO_ROUNDABOUT_1, edgeCountryNeokyo);

export default ROADS;
