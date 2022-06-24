import { Roads } from "../Roads.js";
import edgeCastle1 from "./edges/castle-1.js";
import edgeCastle2 from "./edges/castle-2.js";
import edgeCastle3 from "./edges/castle-3.js";
import edgeCastle4 from "./edges/castle-4.js";
import edgeCastle5 from "./edges/castle-5.js";
import edgeCastle6 from "./edges/castle-6.js";
import edgeCastle7 from "./edges/castle-7.js";
import {
  edgeCastleSouthA1,
  edgeCastleSouthA2,
  edgeCastleSouthA3,
} from "./edges/castle-south-a.js";
import {
  edgeCastleSouthB1,
  edgeCastleSouthB2,
  edgeCastleSouthB3,
} from "./edges/castle-south-b.js";
import edgeCountryAToB from "./edges/country-a-to-b.js";
import edgeCountryBToCastle from "./edges/country-b-to-castle.js";
import edgeCountryBToTemple from "./edges/country-b-to-temple.js";
import edgeCountryCToE from "./edges/country-c-to-e.js";
import edgeCountryCToF from "./edges/country-c-to-f.js";
import edgeCountryCToVillage from "./edges/country-c-to-village.js";
import edgeCountryCastleToE from "./edges/country-castle-to-e.js";
import edgeCountryDToE from "./edges/country-d-to-e.js";
import edgeCountryDToF from "./edges/country-d-to-f.js";
import edgeCountryDToPaddock from "./edges/country-d-to-paddock.js";
import { edgeCountryE1, edgeCountryE2, edgeCountryE3 } from "./edges/country-e.js";
import edgeCountryNeokyo from "./edges/country-neokyo.js";
import edgeCountryPaddockToA from "./edges/country-paddock-to-a.js";
import edgeCountryPaddockToTemple from "./edges/country-paddock-to-temple.js";
import edgeCountryVillageToA from "./edges/country-village-to-a.js";
import edgeNeokyo1 from "./edges/neokyo-1.js";
import edgeNeokyo10 from "./edges/neokyo-10.js";
import edgeNeokyo12 from "./edges/neokyo-12.js";
import edgeNeokyo13 from "./edges/neokyo-13.js";
import edgeNeokyo14 from "./edges/neokyo-14.js";
import edgeNeokyo15 from "./edges/neokyo-15.js";
import edgeNeokyo16 from "./edges/neokyo-16.js";
import edgeNeokyo17 from "./edges/neokyo-17.js";
import edgeNeokyo18 from "./edges/neokyo-18.js";
import edgeNeokyo19 from "./edges/neokyo-19.js";
import edgeNeokyo2 from "./edges/neokyo-2.js";
import edgeNeokyo3 from "./edges/neokyo-3.js";
import edgeNeokyo4 from "./edges/neokyo-4.js";
import edgeNeokyo5 from "./edges/neokyo-5.js";
import edgeNeokyo6 from "./edges/neokyo-6.js";
import edgeNeokyo7 from "./edges/neokyo-7.js";
import edgeNeokyo8 from "./edges/neokyo-8.js";
import edgeNeokyo9 from "./edges/neokyo-9.js";
import { edgeNeokyoA1, edgeNeokyoA2, edgeNeokyoA3 } from "./edges/neokyo-a.js";
import { edgeNeokyoB1, edgeNeokyoB2, edgeNeokyoB3 } from "./edges/neokyo-b.js";
import { edgeNeokyoC1, edgeNeokyoC2, edgeNeokyoC3 } from "./edges/neokyo-c.js";
import edgeNeokyoCastle from "./edges/neokyo-castle.js";
import {
  edgeNeokyoCastleNorth1,
  edgeNeokyoCastleNorth2,
  edgeNeokyoCastleNorth3,
} from "./edges/neokyo-castle-north.js";
import {
  edgeNeokyoCastleSouth1,
  edgeNeokyoCastleSouth2,
  edgeNeokyoCastleSouth3,
} from "./edges/neokyo-castle-south.js";
import { edgeNeokyoD1, edgeNeokyoD2, edgeNeokyoD3 } from "./edges/neokyo-d.js";
import { edgeNeokyoE1, edgeNeokyoE2, edgeNeokyoE3 } from "./edges/neokyo-e.js";
import { edgeNeokyoF1, edgeNeokyoF2, edgeNeokyoF3 } from "./edges/neokyo-f.js";
import { edgeNeokyoG1, edgeNeokyoG2, edgeNeokyoG3 } from "./edges/neokyo-g.js";
import {
  edgeNeokyoH1,
  edgeNeokyoH2,
  edgeNeokyoH3,
  edgeNeokyoH4,
  edgeNeokyoH5,
  edgeNeokyoH6,
} from "./edges/neokyo-h.js";
import edgeNeokyoRooftop from "./edges/neokyo-rooftop.js";
import edgeNeokyoRooftopJunction1 from "./edges/neokyo-rooftop-junction-1.js";
import edgeNeokyoRooftopJunction2 from "./edges/neokyo-rooftop-junction-2.js";
import edgeNeokyoRooftopJunction3 from "./edges/neokyo-rooftop-junction-3.js";
import edgeNeokyoRooftopJunction4 from "./edges/neokyo-rooftop-junction-4.js";
import edgeNeokyoRoundabout1 from "./edges/neokyo-roundabout-1.js";
import edgeNeokyoRoundabout2 from "./edges/neokyo-roundabout-2.js";
import edgePaddockNeokyoExit1 from "./edges/paddock-neokyo-exit-1.js";
import edgePaddockNeokyoExit2 from "./edges/paddock-neokyo-exit-2.js";
import edgePaddockToCastle from "./edges/paddock-to-castle.js";
import edgeTempleBypass from "./edges/temple-bypass.js";
import edgeTempleEntryNorth from "./edges/temple-entry-north.js";
import edgeTempleEntrySouth from "./edges/temple-entry-south.js";
import edgeTempleKOM from "./edges/temple-kom.js";
import edgeVillageMiddle from "./edges/village-middle.js";
import edgeVillageNorth from "./edges/village-north.js";
import edgeVillageSouth from "./edges/village-south.js";

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
const PADDOCK_NEOKYO_SOUTH_1 = ROADS.createNode([-10.807506, 165.838333, 123]);
const PADDOCK_NEOKYO_SOUTH_2 = ROADS.createNode([-10.807008, 165.840053, 123]);
const PADDOCK_NEOKYO_SOUTH_3 = ROADS.createNode([-10.808149, 165.838532, 123]);
const PADDOCK_NEOKYO_SOUTH_4 = ROADS.createNode([-10.807654, 165.840246, 123]);
const PADDOCK_NEOKYO_SOUTH_MIDDLE = ROADS.createNode([
  -10.808323, 165.839514, 123,
]);
const PADDOCK_NEOKYO_SOUTH_ROW_BACK = ROADS.createNode([
  -10.807169, 165.839159, 123,
]);
const PADDOCK_NEOKYO_SOUTH_ROW_FRONT = ROADS.createNode([
  -10.806521, 165.838969, 123,
]);
const PADDOCK_NEOKYO_SOUTH_EXIT = ROADS.createNode([
  -10.805406, 165.838655, 123,
]);
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
const NEOKYO_CASTLE_SOUTH_3 = ROADS.createNode([-10.803451, 165.843867, 125.6]);
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

// Neokyo Junctions
const NEOKYO_A_1 = ROADS.createNode([-10.783617, 165.838242, 125.8]);
const NEOKYO_A_2 = ROADS.createNode([-10.783965, 165.838553, 125.8]);
const NEOKYO_A_3 = ROADS.createNode([-10.784144, 165.838151, 125.8]);
ROADS.createEdge(NEOKYO_A_1, NEOKYO_A_2, edgeNeokyoA1);
ROADS.createEdge(NEOKYO_A_2, NEOKYO_A_3, edgeNeokyoA2);
ROADS.createEdge(NEOKYO_A_3, NEOKYO_A_1, edgeNeokyoA3);

const NEOKYO_B_1 = ROADS.createNode([-10.788937, 165.837126, 126]);
const NEOKYO_B_2 = ROADS.createNode([-10.789226, 165.836837, 126]);
const NEOKYO_B_3 = ROADS.createNode([-10.789263, 165.837199, 126]);
ROADS.createEdge(NEOKYO_B_1, NEOKYO_B_2, edgeNeokyoB1);
ROADS.createEdge(NEOKYO_B_2, NEOKYO_B_3, edgeNeokyoB2);
ROADS.createEdge(NEOKYO_B_3, NEOKYO_B_1, edgeNeokyoB3);

const NEOKYO_C_1 = ROADS.createNode([-10.795363, 165.839811, 125.6]);
const NEOKYO_C_2 = ROADS.createNode([-10.795155, 165.840155, 125.6]);
const NEOKYO_C_3 = ROADS.createNode([-10.795653, 165.840203, 125.6]);
ROADS.createEdge(NEOKYO_C_1, NEOKYO_C_2, edgeNeokyoC1);
ROADS.createEdge(NEOKYO_C_2, NEOKYO_C_3, edgeNeokyoC2);
ROADS.createEdge(NEOKYO_C_3, NEOKYO_C_1, edgeNeokyoC3);

const NEOKYO_D_1 = ROADS.createNode([-10.799046, 165.841496, 125]);
const NEOKYO_D_2 = ROADS.createNode([-10.798606, 165.841037, 125]);
const NEOKYO_D_3 = ROADS.createNode([-10.799223, 165.840951, 125]);
ROADS.createEdge(NEOKYO_D_1, NEOKYO_D_2, edgeNeokyoD1);
ROADS.createEdge(NEOKYO_D_2, NEOKYO_D_3, edgeNeokyoD2);
ROADS.createEdge(NEOKYO_D_3, NEOKYO_D_1, edgeNeokyoD3);

const NEOKYO_E_1 = ROADS.createNode([-10.796166, 165.843379, 126]);
const NEOKYO_E_2 = ROADS.createNode([-10.796491, 165.843658, 126.2]);
const NEOKYO_E_3 = ROADS.createNode([-10.79667, 165.84332, 126]);
ROADS.createEdge(NEOKYO_E_1, NEOKYO_E_2, edgeNeokyoE1);
ROADS.createEdge(NEOKYO_E_2, NEOKYO_E_3, edgeNeokyoE2);
ROADS.createEdge(NEOKYO_E_3, NEOKYO_E_1, edgeNeokyoE3);

const NEOKYO_F_1 = ROADS.createNode([-10.791508, 165.843545, 126]);
const NEOKYO_F_2 = ROADS.createNode([-10.791577, 165.844097, 126]);
const NEOKYO_F_3 = ROADS.createNode([-10.791266, 165.843827, 126]);
ROADS.createEdge(NEOKYO_F_1, NEOKYO_F_2, edgeNeokyoF1);
ROADS.createEdge(NEOKYO_F_2, NEOKYO_F_3, edgeNeokyoF2);
ROADS.createEdge(NEOKYO_F_3, NEOKYO_F_1, edgeNeokyoF3);

const NEOKYO_G_1 = ROADS.createNode([-10.791095, 165.841142, 138.2]);
const NEOKYO_G_2 = ROADS.createNode([-10.791355, 165.840409, 138.2]);
const NEOKYO_G_3 = ROADS.createNode([-10.791532, 165.84116, 138.2]);
ROADS.createEdge(NEOKYO_G_1, NEOKYO_G_2, edgeNeokyoG1);
ROADS.createEdge(NEOKYO_G_2, NEOKYO_G_3, edgeNeokyoG2);
ROADS.createEdge(NEOKYO_G_3, NEOKYO_G_1, edgeNeokyoG3);

const NEOKYO_H_1 = ROADS.createNode([-10.791316, 165.840206, 126]);
const NEOKYO_H_2 = ROADS.createNode([-10.791606, 165.840503, 126]);
const NEOKYO_H_3 = ROADS.createNode([-10.791411, 165.840793, 126]);
const NEOKYO_H_4 = ROADS.createNode([-10.79116, 165.840659, 126]);
ROADS.createEdge(NEOKYO_H_1, NEOKYO_H_2, edgeNeokyoH1);
ROADS.createEdge(NEOKYO_H_2, NEOKYO_H_3, edgeNeokyoH2);
ROADS.createEdge(NEOKYO_H_3, NEOKYO_H_4, edgeNeokyoH3);
ROADS.createEdge(NEOKYO_H_4, NEOKYO_H_1, edgeNeokyoH4);
ROADS.createEdge(NEOKYO_H_1, NEOKYO_H_3, edgeNeokyoH5);
ROADS.createEdge(NEOKYO_H_2, NEOKYO_H_4, edgeNeokyoH6);

// Neokyo Rest
ROADS.createEdge(COUNTRY_F, NEOKYO_ROUNDABOUT_1, edgeCountryNeokyo);
ROADS.createEdge(NEOKYO_ROUNDABOUT_2, NEOKYO_A_1, edgeNeokyo1);
ROADS.createEdge(PADDOCK_NEOKYO_NORTH_EXIT_3, NEOKYO_A_2, edgeNeokyo2);
ROADS.createEdge(NEOKYO_A_3, NEOKYO_B_1, edgeNeokyo3);
ROADS.createEdge(NEOKYO_B_2, NEOKYO_C_1, edgeNeokyo4);
ROADS.createEdge(NEOKYO_D_2, NEOKYO_C_3, edgeNeokyo5);
ROADS.createEdge(NEOKYO_D_3, PADDOCK_NEOKYO_SOUTH_EXIT, edgeNeokyo6);
ROADS.createEdge(PADDOCK_NEOKYO_SOUTH_EXIT, NEOKYO_CASTLE_SOUTH_1, edgeNeokyo7);
ROADS.createEdge(NEOKYO_CASTLE_NORTH_3, NEOKYO_E_3, edgeNeokyo8);
ROADS.createEdge(NEOKYO_CASTLE_NORTH_2, NEOKYO_D_1, edgeNeokyo9);
ROADS.createEdge(NEOKYO_CASTLE_SOUTH_2, NEOKYO_E_2, edgeNeokyo10);
ROADS.createEdge(NEOKYO_E_1, NEOKYO_F_2, edgeNeokyo12);
ROADS.createEdge(NEOKYO_F_3, NEOKYO_G_1, edgeNeokyo13);
ROADS.createEdge(NEOKYO_ROOFTOP_1, NEOKYO_G_3, edgeNeokyo14);
ROADS.createEdge(NEOKYO_G_2, NEOKYO_ROOFTOP_2, edgeNeokyo15);
ROADS.createEdge(NEOKYO_F_1, NEOKYO_H_3, edgeNeokyo16);
ROADS.createEdge(NEOKYO_H_2, NEOKYO_C_2, edgeNeokyo17);
ROADS.createEdge(NEOKYO_H_1, NEOKYO_B_3, edgeNeokyo18);
ROADS.createEdge(NEOKYO_H_4, PADDOCK_NEOKYO_NORTH_EXIT_2, edgeNeokyo19);

export default ROADS;
