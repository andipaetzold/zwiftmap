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
import {
  edgeCountryE1,
  edgeCountryE2,
  edgeCountryE3,
} from "./edges/country-e.js";
import edgeCountryNeokyo from "./edges/country-neokyo.js";
import edgeCountryNeokyo2 from "./edges/country-neokyo-2.js";
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
import edgeNeokyo20 from "./edges/neokyo-20.js";
import { edgeNeokyoA1, edgeNeokyoA2, edgeNeokyoA3 } from "./edges/neokyo-a.js";
import { edgeNeokyoB1, edgeNeokyoB2, edgeNeokyoB3 } from "./edges/neokyo-b.js";
import { edgeNeokyoC1, edgeNeokyoC2, edgeNeokyoC3 } from "./edges/neokyo-c.js";
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
import edgeNeokyoCastle from "./edges/neokyo-castle.js";
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
import edgeNeokyoRooftopJunction1 from "./edges/neokyo-rooftop-junction-1.js";
import edgeNeokyoRooftopJunction2 from "./edges/neokyo-rooftop-junction-2.js";
import edgeNeokyoRooftopJunction3 from "./edges/neokyo-rooftop-junction-3.js";
import edgeNeokyoRooftopJunction4 from "./edges/neokyo-rooftop-junction-4.js";
import edgeNeokyoRooftop from "./edges/neokyo-rooftop.js";
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
import edgeUrukaziNorthIsle1 from "./edges/urukazi-north-isle-1.js";
import edgeUrukaziNorthIsle2 from "./edges/urukazi-north-isle-2.js";
import edgeUrukaziNorthIsle3 from "./edges/urukazi-north-isle-3.js";
import edgeUrukaziWestIsle1 from "./edges/urukazi-west-isle-1.js";
import edgeUrukaziWestIsle2 from "./edges/urukazi-west-isle-2.js";
import edgeUrukaziNorthIsleBridge from "./edges/urukazi-north-isle-bridge.js";
import edgeUrukaziCoastCenter from "./edges/urukazi-coast-center.js";
import edgeUrukaziSouthIsle1 from "./edges/urukazi-south-isle-1.js";
import edgeUrukaziSouthIsle2 from "./edges/urukazi-south-isle-2.js";
import edgeUrukaziSouthIsleBridge from "./edges/urukazi-south-isle-bridge.js";
import edgeUrukaziCoastBridgeNorth from "./edges/urukazi-coast-bridge-north.js";
import edgeUrukaziCoastBridgeSouth from "./edges/urukazi-coast-bridge-south.js";
import edgeUrukaziNeokyoNorthConnector from "./edges/urukazi-neokyo-north-connector.js";
import edgeUrukaziNeokyoSouthConnector from "./edges/urukazi-neokyo-south-connector.js";

const ROADS = new Roads();
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Temple
const TEMPLE_ENTRY_NORTH = createNode([-10.747792, 165.854824, 130.6]);
const TEMPLE_ENTRY_SOUTH = createNode([-10.758005, 165.849271, 137]);
const TEMPLE_BYPASS_NORTH = createNode([-10.751153, 165.857172, 152.6]);
const TEMPLE_BYPASS_SOUTH = createNode([-10.756155, 165.85237, 166.6]);
createEdge(TEMPLE_BYPASS_SOUTH, TEMPLE_BYPASS_NORTH, edgeTempleKOM);
createEdge(TEMPLE_BYPASS_NORTH, TEMPLE_BYPASS_SOUTH, edgeTempleBypass);
createEdge(TEMPLE_ENTRY_NORTH, TEMPLE_BYPASS_NORTH, edgeTempleEntryNorth);
createEdge(TEMPLE_BYPASS_SOUTH, TEMPLE_ENTRY_SOUTH, edgeTempleEntrySouth);

// Paddock North
const PADDOCK_NORTH_1 = createNode([-10.743354, 165.850334, 109]);
const PADDOCK_NORTH_2 = createNode([-10.742885, 165.852088, 109]);
const PADDOCK_NORTH_3 = createNode([-10.742716, 165.850183, 109]);
const PADDOCK_NORTH_4 = createNode([-10.742231, 165.851895, 109]);
const PADDOCK_NORTH_MIDDLE = createNode([-10.742026, 165.850902, 109]);
const PADDOCK_NORTH_ROW_FRONT = createNode([-10.743855, 165.851428, 109]);
const PADDOCK_NORTH_ROW_BACK = createNode([-10.74319, 165.851251, 109]);
const PADDOCK_NORTH_EXIT = createNode([-10.744888, 165.851723, 109]);
createEdge(PADDOCK_NORTH_1, PADDOCK_NORTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NORTH_2, PADDOCK_NORTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NORTH_3, PADDOCK_NORTH_ROW_BACK, [], false);
createEdge(PADDOCK_NORTH_4, PADDOCK_NORTH_ROW_BACK, [], false);
createEdge(PADDOCK_NORTH_MIDDLE, PADDOCK_NORTH_ROW_BACK, [], false);
createEdge(PADDOCK_NORTH_ROW_BACK, PADDOCK_NORTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NORTH_ROW_FRONT, PADDOCK_NORTH_EXIT, [], false);

// Paddock South
const PADDOCK_SOUTH_1 = createNode([-10.768962, 165.845801, 83.8]);
const PADDOCK_SOUTH_2 = createNode([-10.767547, 165.846865, 83.8]);
const PADDOCK_SOUTH_3 = createNode([-10.769357, 165.846337, 83.8]);
const PADDOCK_SOUTH_4 = createNode([-10.767971, 165.847421, 83.8]);
const PADDOCK_SOUTH_MIDDLE = createNode([-10.768951, 165.84726, 83.8]);
const PADDOCK_SOUTH_ROW_FRONT = createNode([-10.767805, 165.845736, 83.8]);
const PADDOCK_SOUTH_ROW_BACK = createNode([-10.768216, 165.846291, 83.8]);
const PADDOCK_SOUTH_EXIT = createNode([-10.767157, 165.844875, 83.8]);
createEdge(PADDOCK_SOUTH_1, PADDOCK_SOUTH_ROW_FRONT, [], false);
createEdge(PADDOCK_SOUTH_2, PADDOCK_SOUTH_ROW_FRONT, [], false);
createEdge(PADDOCK_SOUTH_3, PADDOCK_SOUTH_ROW_BACK, [], false);
createEdge(PADDOCK_SOUTH_4, PADDOCK_SOUTH_ROW_BACK, [], false);
createEdge(PADDOCK_SOUTH_MIDDLE, PADDOCK_SOUTH_ROW_BACK, [], false);
createEdge(PADDOCK_SOUTH_ROW_BACK, PADDOCK_SOUTH_ROW_FRONT, [], false);
createEdge(PADDOCK_SOUTH_ROW_FRONT, PADDOCK_SOUTH_EXIT, [], false);

// Village
const VILLAGE_EAST = createNode([-10.746258, 165.844588, 93.6]);
const VILLAGE_WEST = createNode([-10.748485, 165.842115, 93.6]);
createEdge(VILLAGE_WEST, VILLAGE_EAST, edgeVillageNorth);
createEdge(VILLAGE_WEST, VILLAGE_EAST, edgeVillageMiddle);
createEdge(VILLAGE_EAST, VILLAGE_WEST, edgeVillageSouth);

// Castle
const CASTLE_NORTH_A = createNode([-10.755473, 165.848247, 134.8]);
const CASTLE_NORTH_B = createNode([-10.757028, 165.84792, 136.2]);
const CASTLE_MIDDLE = createNode([-10.760925, 165.846452, 136]);

const CASTLE_SOUTH_A_1 = createNode([-10.764166, 165.844988, 102.4]);
const CASTLE_SOUTH_A_2 = createNode([-10.7638, 165.845079, 102.4]);
const CASTLE_SOUTH_A_3 = createNode([-10.763876, 165.845286, 102.2]);
createEdge(CASTLE_SOUTH_A_2, CASTLE_SOUTH_A_1, edgeCastleSouthA1);
createEdge(CASTLE_SOUTH_A_2, CASTLE_SOUTH_A_3, edgeCastleSouthA2);
createEdge(CASTLE_SOUTH_A_3, CASTLE_SOUTH_A_1, edgeCastleSouthA3);

const CASTLE_SOUTH_B_1 = createNode([-10.762461, 165.84542, 99.4]);
const CASTLE_SOUTH_B_2 = createNode([-10.762595, 165.845731, 99.2]);
const CASTLE_SOUTH_B_3 = createNode([-10.762798, 165.845463, 99.2]);
createEdge(CASTLE_SOUTH_B_2, CASTLE_SOUTH_B_1, edgeCastleSouthB1);
createEdge(CASTLE_SOUTH_B_2, CASTLE_SOUTH_B_3, edgeCastleSouthB2);
createEdge(CASTLE_SOUTH_B_1, CASTLE_SOUTH_B_3, edgeCastleSouthB3);

createEdge(CASTLE_NORTH_B, CASTLE_NORTH_A, edgeCastle1);
createEdge(TEMPLE_ENTRY_SOUTH, CASTLE_NORTH_B, edgeCastle2);
createEdge(CASTLE_MIDDLE, CASTLE_NORTH_B, edgeCastle3);
createEdge(TEMPLE_ENTRY_SOUTH, CASTLE_MIDDLE, edgeCastle4);
createEdge(CASTLE_MIDDLE, CASTLE_SOUTH_A_3, edgeCastle5);
createEdge(CASTLE_SOUTH_B_3, CASTLE_SOUTH_A_2, edgeCastle6);
createEdge(CASTLE_NORTH_A, CASTLE_SOUTH_B_2, edgeCastle7);

// Countryside Rest
const COUNTRY_A = createNode([-10.746116, 165.846959, 100.6]);
const COUNTRY_B = createNode([-10.750822, 165.852141, 132.8]);
const COUNTRY_C = createNode([-10.758184, 165.834066, 68]);
const COUNTRY_D = createNode([-10.769018, 165.84151, 69.8]);
const COUNTRY_F = createNode([-10.775112, 165.83019, 67.8]);

const COUNTRY_E_1 = createNode([-10.759273, 165.838325, 68.2]);
const COUNTRY_E_2 = createNode([-10.759217, 165.838872, 68.2]);
const COUNTRY_E_3 = createNode([-10.759507, 165.838604, 68.2]);
createEdge(COUNTRY_E_1, COUNTRY_E_2, edgeCountryE1);
createEdge(COUNTRY_E_2, COUNTRY_E_3, edgeCountryE2);
createEdge(COUNTRY_E_3, COUNTRY_E_1, edgeCountryE3);

createEdge(CASTLE_SOUTH_A_1, PADDOCK_SOUTH_EXIT, edgePaddockToCastle);
createEdge(VILLAGE_EAST, COUNTRY_A, edgeCountryVillageToA);
createEdge(COUNTRY_A, PADDOCK_NORTH_EXIT, edgeCountryPaddockToA);
createEdge(PADDOCK_NORTH_EXIT, TEMPLE_ENTRY_NORTH, edgeCountryPaddockToTemple);
createEdge(COUNTRY_B, COUNTRY_A, edgeCountryAToB);
createEdge(COUNTRY_B, TEMPLE_ENTRY_NORTH, edgeCountryBToTemple);
createEdge(CASTLE_NORTH_A, COUNTRY_B, edgeCountryBToCastle);
createEdge(COUNTRY_C, COUNTRY_E_1, edgeCountryCToE);
createEdge(COUNTRY_E_2, CASTLE_SOUTH_B_1, edgeCountryCastleToE);
createEdge(COUNTRY_D, COUNTRY_E_3, edgeCountryDToE);
createEdge(PADDOCK_SOUTH_EXIT, COUNTRY_D, edgeCountryDToPaddock);
createEdge(COUNTRY_C, VILLAGE_WEST, edgeCountryCToVillage);
createEdge(COUNTRY_D, COUNTRY_F, edgeCountryDToF);
createEdge(COUNTRY_F, COUNTRY_C, edgeCountryCToF);

// Paddock Neokyo North
const PADDOCK_NEOKYO_NORTH_1 = createNode([-10.781435, 165.842088, 66.4]);
const PADDOCK_NEOKYO_NORTH_2 = createNode([-10.781446, 165.8438, 66.4]);
const PADDOCK_NEOKYO_NORTH_3 = createNode([-10.780777, 165.842094, 66.4]);
const PADDOCK_NEOKYO_NORTH_4 = createNode([-10.780777, 165.843816, 66.4]);
const PADDOCK_NEOKYO_NORTH_MIDDLE = createNode([-10.780276, 165.842995, 66.4]);
const PADDOCK_NEOKYO_NORTH_ROW_FRONT = createNode([
  -10.782184, 165.843006, 66.4,
]);
const PADDOCK_NEOKYO_NORTH_ROW_BACK = createNode([
  -10.781477, 165.842995, 66.4,
]);
const PADDOCK_NEOKYO_NORTH_EXIT_1 = createNode([-10.782895, 165.843006, 66.4]);
const PADDOCK_NEOKYO_NORTH_EXIT_2 = createNode([-10.783338, 165.843019, 66.4]);
const PADDOCK_NEOKYO_NORTH_EXIT_3 = createNode([-10.783169, 165.842577, 66.4]);
createEdge(PADDOCK_NEOKYO_NORTH_1, PADDOCK_NEOKYO_NORTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NEOKYO_NORTH_2, PADDOCK_NEOKYO_NORTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NEOKYO_NORTH_3, PADDOCK_NEOKYO_NORTH_ROW_BACK, [], false);
createEdge(PADDOCK_NEOKYO_NORTH_4, PADDOCK_NEOKYO_NORTH_ROW_BACK, [], false);
createEdge(
  PADDOCK_NEOKYO_NORTH_MIDDLE,
  PADDOCK_NEOKYO_NORTH_ROW_BACK,
  [],
  false
);
createEdge(
  PADDOCK_NEOKYO_NORTH_ROW_BACK,
  PADDOCK_NEOKYO_NORTH_ROW_FRONT,
  [],
  false
);
createEdge(
  PADDOCK_NEOKYO_NORTH_ROW_FRONT,
  PADDOCK_NEOKYO_NORTH_EXIT_1,
  [],
  false
);
createEdge(PADDOCK_NEOKYO_NORTH_EXIT_1, PADDOCK_NEOKYO_NORTH_EXIT_2, [], false);
createEdge(
  PADDOCK_NEOKYO_NORTH_EXIT_3,
  PADDOCK_NEOKYO_NORTH_EXIT_2,
  edgePaddockNeokyoExit1
);
createEdge(
  PADDOCK_NEOKYO_NORTH_EXIT_1,
  PADDOCK_NEOKYO_NORTH_EXIT_3,
  edgePaddockNeokyoExit2,
  false
);

// Paddock Neokyo South
const PADDOCK_NEOKYO_SOUTH_1 = createNode([-10.807506, 165.838333, 63]);
const PADDOCK_NEOKYO_SOUTH_2 = createNode([-10.807008, 165.840053, 63]);
const PADDOCK_NEOKYO_SOUTH_3 = createNode([-10.808149, 165.838532, 63]);
const PADDOCK_NEOKYO_SOUTH_4 = createNode([-10.807654, 165.840246, 63]);
const PADDOCK_NEOKYO_SOUTH_MIDDLE = createNode([-10.808323, 165.839514, 63]);
const PADDOCK_NEOKYO_SOUTH_ROW_BACK = createNode([-10.807169, 165.839159, 63]);
const PADDOCK_NEOKYO_SOUTH_ROW_FRONT = createNode([-10.806521, 165.838969, 63]);
const PADDOCK_NEOKYO_SOUTH_EXIT = createNode([-10.805406, 165.838655, 63]);
createEdge(
  PADDOCK_NEOKYO_SOUTH_MIDDLE,
  PADDOCK_NEOKYO_SOUTH_ROW_BACK,
  [],
  false
);
createEdge(
  PADDOCK_NEOKYO_SOUTH_ROW_BACK,
  PADDOCK_NEOKYO_SOUTH_ROW_FRONT,
  [],
  false
);
createEdge(
  PADDOCK_NEOKYO_SOUTH_ROW_FRONT,
  PADDOCK_NEOKYO_SOUTH_EXIT,
  [],
  false
);
createEdge(PADDOCK_NEOKYO_SOUTH_1, PADDOCK_NEOKYO_SOUTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NEOKYO_SOUTH_2, PADDOCK_NEOKYO_SOUTH_ROW_FRONT, [], false);
createEdge(PADDOCK_NEOKYO_SOUTH_3, PADDOCK_NEOKYO_SOUTH_ROW_BACK, [], false);
createEdge(PADDOCK_NEOKYO_SOUTH_4, PADDOCK_NEOKYO_SOUTH_ROW_BACK, [], false);

// Neokyo Roundabout
const NEOKYO_ROUNDABOUT_1 = createNode([-10.780663, 165.833776, 65.6]);
const NEOKYO_ROUNDABOUT_2 = createNode([-10.781122, 165.835375, 65.6]);
createEdge(NEOKYO_ROUNDABOUT_2, NEOKYO_ROUNDABOUT_1, edgeNeokyoRoundabout1);
createEdge(NEOKYO_ROUNDABOUT_1, NEOKYO_ROUNDABOUT_2, edgeNeokyoRoundabout2);

// Neokyo Rooftop
const NEOKYO_ROOFTOP_1 = createNode([-10.789693, 165.846608, 80]);
const NEOKYO_ROOFTOP_2 = createNode([-10.7892, 165.84624, 80]);
const NEOKYO_ROOFTOP_3 = createNode([-10.788958, 165.846707, 80]);
const NEOKYO_ROOFTOP_4 = createNode([-10.789395, 165.847005, 80]);
createEdge(NEOKYO_ROOFTOP_3, NEOKYO_ROOFTOP_4, edgeNeokyoRooftop);
createEdge(NEOKYO_ROOFTOP_4, NEOKYO_ROOFTOP_1, edgeNeokyoRooftopJunction1);
createEdge(NEOKYO_ROOFTOP_2, NEOKYO_ROOFTOP_3, edgeNeokyoRooftopJunction2);
createEdge(NEOKYO_ROOFTOP_2, NEOKYO_ROOFTOP_1, edgeNeokyoRooftopJunction3);
createEdge(NEOKYO_ROOFTOP_3, NEOKYO_ROOFTOP_4, edgeNeokyoRooftopJunction4);

// Neokyo Castle
const NEOKYO_CASTLE_NORTH_1 = createNode([-10.799473, 165.842966, 66.6]);
const NEOKYO_CASTLE_NORTH_2 = createNode([-10.799225, 165.842721, 66.4]);
const NEOKYO_CASTLE_NORTH_3 = createNode([-10.799083, 165.842987, 66.4]);
createEdge(
  NEOKYO_CASTLE_NORTH_2,
  NEOKYO_CASTLE_NORTH_1,
  edgeNeokyoCastleNorth1
);
createEdge(
  NEOKYO_CASTLE_NORTH_2,
  NEOKYO_CASTLE_NORTH_3,
  edgeNeokyoCastleNorth2
);
createEdge(
  NEOKYO_CASTLE_NORTH_3,
  NEOKYO_CASTLE_NORTH_1,
  edgeNeokyoCastleNorth3
);

const NEOKYO_CASTLE_SOUTH_1 = createNode([-10.803689, 165.843738, 65.6]);
const NEOKYO_CASTLE_SOUTH_2 = createNode([-10.803578, 165.844116, 65.6]);
const NEOKYO_CASTLE_SOUTH_3 = createNode([-10.803451, 165.843867, 65.6]);
createEdge(
  NEOKYO_CASTLE_SOUTH_1,
  NEOKYO_CASTLE_SOUTH_2,
  edgeNeokyoCastleSouth1
);
createEdge(
  NEOKYO_CASTLE_SOUTH_3,
  NEOKYO_CASTLE_SOUTH_2,
  edgeNeokyoCastleSouth2
);
createEdge(
  NEOKYO_CASTLE_SOUTH_3,
  NEOKYO_CASTLE_SOUTH_1,
  edgeNeokyoCastleSouth3
);

createEdge(NEOKYO_CASTLE_NORTH_1, NEOKYO_CASTLE_SOUTH_3, edgeNeokyoCastle);

// Neokyo Junctions
const NEOKYO_A_1 = createNode([-10.783617, 165.838242, 65.8]);
const NEOKYO_A_2 = createNode([-10.783965, 165.838553, 65.8]);
const NEOKYO_A_3 = createNode([-10.784144, 165.838151, 65.8]);
createEdge(NEOKYO_A_1, NEOKYO_A_2, edgeNeokyoA1);
createEdge(NEOKYO_A_2, NEOKYO_A_3, edgeNeokyoA2);
createEdge(NEOKYO_A_3, NEOKYO_A_1, edgeNeokyoA3);

const NEOKYO_B_1 = createNode([-10.788937, 165.837126, 66]);
const NEOKYO_B_2 = createNode([-10.789226, 165.836837, 66]);
const NEOKYO_B_3 = createNode([-10.789263, 165.837199, 66]);
createEdge(NEOKYO_B_1, NEOKYO_B_2, edgeNeokyoB1);
createEdge(NEOKYO_B_2, NEOKYO_B_3, edgeNeokyoB2);
createEdge(NEOKYO_B_3, NEOKYO_B_1, edgeNeokyoB3);

const NEOKYO_C_1 = createNode([-10.795363, 165.839811, 65.6]);
const NEOKYO_C_2 = createNode([-10.795155, 165.840155, 65.6]);
const NEOKYO_C_3 = createNode([-10.795653, 165.840203, 65.6]);
createEdge(NEOKYO_C_1, NEOKYO_C_2, edgeNeokyoC1);
createEdge(NEOKYO_C_2, NEOKYO_C_3, edgeNeokyoC2);
createEdge(NEOKYO_C_3, NEOKYO_C_1, edgeNeokyoC3);

const NEOKYO_D_1 = createNode([-10.799046, 165.841496, 65]);
const NEOKYO_D_2 = createNode([-10.798606, 165.841037, 65]);
const NEOKYO_D_3 = createNode([-10.799223, 165.840951, 65]);
createEdge(NEOKYO_D_1, NEOKYO_D_2, edgeNeokyoD1);
createEdge(NEOKYO_D_2, NEOKYO_D_3, edgeNeokyoD2);
createEdge(NEOKYO_D_3, NEOKYO_D_1, edgeNeokyoD3);

const NEOKYO_E_1 = createNode([-10.796166, 165.843379, 66]);
const NEOKYO_E_2 = createNode([-10.796491, 165.843658, 66.2]);
const NEOKYO_E_3 = createNode([-10.79667, 165.84332, 66]);
createEdge(NEOKYO_E_1, NEOKYO_E_2, edgeNeokyoE1);
createEdge(NEOKYO_E_2, NEOKYO_E_3, edgeNeokyoE2);
createEdge(NEOKYO_E_3, NEOKYO_E_1, edgeNeokyoE3);

const NEOKYO_F_1 = createNode([-10.791508, 165.843545, 66]);
const NEOKYO_F_2 = createNode([-10.791577, 165.844097, 66]);
const NEOKYO_F_3 = createNode([-10.791266, 165.843827, 66]);
createEdge(NEOKYO_F_1, NEOKYO_F_2, edgeNeokyoF1);
createEdge(NEOKYO_F_2, NEOKYO_F_3, edgeNeokyoF2);
createEdge(NEOKYO_F_3, NEOKYO_F_1, edgeNeokyoF3);

const NEOKYO_G_1 = createNode([-10.791095, 165.841142, 78.2]);
const NEOKYO_G_2 = createNode([-10.791355, 165.840409, 78.2]);
const NEOKYO_G_3 = createNode([-10.791532, 165.84116, 78.2]);
createEdge(NEOKYO_G_1, NEOKYO_G_2, edgeNeokyoG1);
createEdge(NEOKYO_G_2, NEOKYO_G_3, edgeNeokyoG2);
createEdge(NEOKYO_G_3, NEOKYO_G_1, edgeNeokyoG3);

const NEOKYO_H_1 = createNode([-10.791316, 165.840206, 66]);
const NEOKYO_H_2 = createNode([-10.791606, 165.840503, 66]);
const NEOKYO_H_3 = createNode([-10.791411, 165.840793, 66]);
const NEOKYO_H_4 = createNode([-10.79116, 165.840659, 66]);
createEdge(NEOKYO_H_1, NEOKYO_H_2, edgeNeokyoH1);
createEdge(NEOKYO_H_2, NEOKYO_H_3, edgeNeokyoH2);
createEdge(NEOKYO_H_3, NEOKYO_H_4, edgeNeokyoH3);
createEdge(NEOKYO_H_4, NEOKYO_H_1, edgeNeokyoH4);
createEdge(NEOKYO_H_1, NEOKYO_H_3, edgeNeokyoH5);
createEdge(NEOKYO_H_2, NEOKYO_H_4, edgeNeokyoH6);

// Neokyo Rest
createEdge(NEOKYO_ROUNDABOUT_2, NEOKYO_A_1, edgeNeokyo1);
createEdge(PADDOCK_NEOKYO_NORTH_EXIT_3, NEOKYO_A_2, edgeNeokyo2);
createEdge(NEOKYO_A_3, NEOKYO_B_1, edgeNeokyo3);
createEdge(NEOKYO_B_2, NEOKYO_C_1, edgeNeokyo4);
createEdge(NEOKYO_D_2, NEOKYO_C_3, edgeNeokyo5);
createEdge(PADDOCK_NEOKYO_SOUTH_EXIT, NEOKYO_CASTLE_SOUTH_1, edgeNeokyo7);
createEdge(NEOKYO_CASTLE_NORTH_3, NEOKYO_E_3, edgeNeokyo8);
createEdge(NEOKYO_CASTLE_NORTH_2, NEOKYO_D_1, edgeNeokyo9);
createEdge(NEOKYO_CASTLE_SOUTH_2, NEOKYO_E_2, edgeNeokyo10);
createEdge(NEOKYO_E_1, NEOKYO_F_2, edgeNeokyo12);
createEdge(NEOKYO_F_3, NEOKYO_G_1, edgeNeokyo13);
createEdge(NEOKYO_ROOFTOP_1, NEOKYO_G_3, edgeNeokyo14);
createEdge(NEOKYO_G_2, NEOKYO_ROOFTOP_2, edgeNeokyo15);
createEdge(NEOKYO_F_1, NEOKYO_H_3, edgeNeokyo16);
createEdge(NEOKYO_H_2, NEOKYO_C_2, edgeNeokyo17);
createEdge(NEOKYO_H_1, NEOKYO_B_3, edgeNeokyo18);
createEdge(NEOKYO_H_4, PADDOCK_NEOKYO_NORTH_EXIT_2, edgeNeokyo19);

// Urukazi - Neokyo
const URUKAZI_NEOKYO_NORTH_1 = createNode([-10.777773, 165.83033, 67.4]);
const URUKAZI_NEOKYO_NORTH_2 = createNode([-10.777262, 165.83022, 67.4]);
const URUKAZI_NEOKYO_NORTH_3 = createNode([-10.77777, 165.830753, 67.4]);
createEdge(URUKAZI_NEOKYO_NORTH_1, URUKAZI_NEOKYO_NORTH_2, []);
createEdge(URUKAZI_NEOKYO_NORTH_2, URUKAZI_NEOKYO_NORTH_3, []);
createEdge(URUKAZI_NEOKYO_NORTH_3, URUKAZI_NEOKYO_NORTH_1, []);

const URUKAZI_NEOKYO_SOUTH_1 = createNode([-10.80552, 165.836509, 66.2]);
const URUKAZI_NEOKYO_SOUTH_2 = createNode([-10.804927, 165.83685, 66.2]);
const URUKAZI_NEOKYO_SOUTH_3 = createNode([-10.805372, 165.836877, 66.2]);
createEdge(URUKAZI_NEOKYO_SOUTH_1, URUKAZI_NEOKYO_SOUTH_2, []);
createEdge(URUKAZI_NEOKYO_SOUTH_2, URUKAZI_NEOKYO_SOUTH_3, []);
createEdge(URUKAZI_NEOKYO_SOUTH_3, URUKAZI_NEOKYO_SOUTH_1, []);

createEdge(COUNTRY_F, URUKAZI_NEOKYO_NORTH_2, edgeCountryNeokyo);
createEdge(URUKAZI_NEOKYO_NORTH_3, NEOKYO_ROUNDABOUT_1, edgeCountryNeokyo2);

createEdge(NEOKYO_D_3, URUKAZI_NEOKYO_SOUTH_2, edgeNeokyo6);
createEdge(URUKAZI_NEOKYO_SOUTH_3, PADDOCK_NEOKYO_SOUTH_EXIT, edgeNeokyo20);

// Urukazi - Paddock
const URUKAZI_PADDOCK_EXIT = createNode([-10.795194, 165.812544, 4.8]);
const URUKAZI_PADDOCK_ROW_FRONT = createNode([-10.794525, 165.813257, 4.8]);
const URUKAZI_PADDOCK_ROW_BACK = createNode([-10.794011, 165.813815, 4.8]);
const URUKAZI_PADDOCK_CENTER = createNode([-10.793187, 165.814671, 4.8]);
const URUKAZI_PADDOCK_1 = createNode([-10.794572, 165.814462, 4.8]);
const URUKAZI_PADDOCK_2 = createNode([-10.793297, 165.813244, 4.8]);
const URUKAZI_PADDOCK_3 = createNode([-10.794109, 165.814961, 4.8]);
const URUKAZI_PADDOCK_4 = createNode([-10.792839, 165.813738, 4.8]);
createEdge(URUKAZI_PADDOCK_CENTER, URUKAZI_PADDOCK_ROW_BACK, [], false);
createEdge(URUKAZI_PADDOCK_ROW_BACK, URUKAZI_PADDOCK_ROW_FRONT, [], false);
createEdge(URUKAZI_PADDOCK_ROW_FRONT, URUKAZI_PADDOCK_EXIT, [], false);
createEdge(URUKAZI_PADDOCK_1, URUKAZI_PADDOCK_ROW_FRONT, [], false);
createEdge(URUKAZI_PADDOCK_2, URUKAZI_PADDOCK_ROW_FRONT, [], false);
createEdge(URUKAZI_PADDOCK_3, URUKAZI_PADDOCK_ROW_BACK, [], false);
createEdge(URUKAZI_PADDOCK_4, URUKAZI_PADDOCK_ROW_BACK, [], false);

// Urukazi - North Isle
const URUKAZI_NORTH_ISLE_WEST_1 = createNode([-10.800848, 165.809934, 5.2]);
const URUKAZI_NORTH_ISLE_WEST_2 = createNode([-10.801191, 165.809741, 5.2]);
const URUKAZI_NORTH_ISLE_WEST_3 = createNode([-10.801146, 165.810194, 5.2]);
createEdge(URUKAZI_NORTH_ISLE_WEST_1, URUKAZI_NORTH_ISLE_WEST_2, []);
createEdge(URUKAZI_NORTH_ISLE_WEST_2, URUKAZI_NORTH_ISLE_WEST_3, []);
createEdge(URUKAZI_NORTH_ISLE_WEST_3, URUKAZI_NORTH_ISLE_WEST_1, []);

const URUKAZI_NORTH_ISLE_EAST_1 = createNode([-10.79574, 165.816543, 5]);
const URUKAZI_NORTH_ISLE_EAST_2 = createNode([-10.795941, 165.816797, 5]);
const URUKAZI_NORTH_ISLE_EAST_3 = createNode([-10.796039, 165.816683, 5]);
createEdge(URUKAZI_NORTH_ISLE_EAST_1, URUKAZI_NORTH_ISLE_EAST_2, []);
createEdge(URUKAZI_NORTH_ISLE_EAST_2, URUKAZI_NORTH_ISLE_EAST_3, []);
createEdge(URUKAZI_NORTH_ISLE_EAST_3, URUKAZI_NORTH_ISLE_EAST_1, []);

createEdge(
  URUKAZI_NORTH_ISLE_WEST_1,
  URUKAZI_PADDOCK_EXIT,
  edgeUrukaziNorthIsle1
);
createEdge(
  URUKAZI_PADDOCK_EXIT,
  URUKAZI_NORTH_ISLE_EAST_1,
  edgeUrukaziNorthIsle2
);
createEdge(
  URUKAZI_NORTH_ISLE_EAST_3,
  URUKAZI_NORTH_ISLE_WEST_3,
  edgeUrukaziNorthIsle3
);

// Urukazi - West Isle
const URUKAZI_WEST_ISLE_NORTH_1 = createNode([-10.801055, 165.808121, 5.8]);
const URUKAZI_WEST_ISLE_NORTH_2 = createNode([-10.801308, 165.8084, 5.8]);
const URUKAZI_WEST_ISLE_NORTH_3 = createNode([-10.801556, 165.80826, 6]);
createEdge(URUKAZI_WEST_ISLE_NORTH_1, URUKAZI_WEST_ISLE_NORTH_2, []);
createEdge(URUKAZI_WEST_ISLE_NORTH_2, URUKAZI_WEST_ISLE_NORTH_3, []);
createEdge(URUKAZI_WEST_ISLE_NORTH_3, URUKAZI_WEST_ISLE_NORTH_1, []);

const URUKAZI_WEST_ISLE_SOUTH_1 = createNode([-10.810104, 165.809741, 6]);
const URUKAZI_WEST_ISLE_SOUTH_2 = createNode([-10.81022, 165.810084, 6]);
const URUKAZI_WEST_ISLE_SOUTH_3 = createNode([-10.810676, 165.809988, 6]);
createEdge(URUKAZI_WEST_ISLE_SOUTH_1, URUKAZI_WEST_ISLE_SOUTH_2, []);
createEdge(URUKAZI_WEST_ISLE_SOUTH_2, URUKAZI_WEST_ISLE_SOUTH_3, []);
createEdge(URUKAZI_WEST_ISLE_SOUTH_3, URUKAZI_WEST_ISLE_SOUTH_1, []);

createEdge(
  URUKAZI_WEST_ISLE_NORTH_3,
  URUKAZI_WEST_ISLE_SOUTH_1,
  edgeUrukaziWestIsle1
);
createEdge(
  URUKAZI_WEST_ISLE_SOUTH_3,
  URUKAZI_WEST_ISLE_NORTH_1,
  edgeUrukaziWestIsle2
);
createEdge(
  URUKAZI_NORTH_ISLE_WEST_2,
  URUKAZI_WEST_ISLE_NORTH_2,
  edgeUrukaziNorthIsleBridge
);

// Urukazi - South Isle
const URUKAZI_SOUTH_ISLE_WEST_1 = createNode([-10.808799, 165.816103, 4.2]);
const URUKAZI_SOUTH_ISLE_WEST_2 = createNode([-10.808667, 165.816489, 4.2]);
const URUKAZI_SOUTH_ISLE_WEST_3 = createNode([-10.809015, 165.816414, 4.2]);
createEdge(URUKAZI_SOUTH_ISLE_WEST_1, URUKAZI_SOUTH_ISLE_WEST_2, []);
createEdge(URUKAZI_SOUTH_ISLE_WEST_2, URUKAZI_SOUTH_ISLE_WEST_3, []);
createEdge(URUKAZI_SOUTH_ISLE_WEST_3, URUKAZI_SOUTH_ISLE_WEST_1, []);

const URUKAZI_SOUTH_ISLE_EAST_1 = createNode([-10.806481, 165.820268, 5.2]);
const URUKAZI_SOUTH_ISLE_EAST_2 = createNode([-10.806766, 165.820609, 5.2]);
const URUKAZI_SOUTH_ISLE_EAST_3 = createNode([-10.806929, 165.820298, 5.2]);
createEdge(URUKAZI_SOUTH_ISLE_EAST_1, URUKAZI_SOUTH_ISLE_EAST_2, []);
createEdge(URUKAZI_SOUTH_ISLE_EAST_2, URUKAZI_SOUTH_ISLE_EAST_3, []);
createEdge(URUKAZI_SOUTH_ISLE_EAST_3, URUKAZI_SOUTH_ISLE_EAST_1, []);

createEdge(
  URUKAZI_SOUTH_ISLE_WEST_3,
  URUKAZI_SOUTH_ISLE_EAST_3,
  edgeUrukaziSouthIsle1
);
createEdge(
  URUKAZI_SOUTH_ISLE_WEST_2,
  URUKAZI_SOUTH_ISLE_EAST_1,
  edgeUrukaziSouthIsle2
);
createEdge(
  URUKAZI_WEST_ISLE_SOUTH_2,
  URUKAZI_SOUTH_ISLE_WEST_1,
  edgeUrukaziSouthIsleBridge
);

// Urukazi - Mainland
const URUKAZI_COAST_NORTH_1 = createNode([-10.795961, 165.818745, 3.2]);
const URUKAZI_COAST_NORTH_2 = createNode([-10.796177, 165.818485, 3.2]);
const URUKAZI_COAST_NORTH_3 = createNode([-10.796382, 165.81874, 3.2]);
createEdge(URUKAZI_COAST_NORTH_1, URUKAZI_COAST_NORTH_2, []);
createEdge(URUKAZI_COAST_NORTH_2, URUKAZI_COAST_NORTH_3, []);
createEdge(URUKAZI_COAST_NORTH_3, URUKAZI_COAST_NORTH_1, []);

const URUKAZI_COAST_SOUTH_1 = createNode([-10.806947, 165.822315, 4.8]);
const URUKAZI_COAST_SOUTH_2 = createNode([-10.807073, 165.822519, 4.8]);
const URUKAZI_COAST_SOUTH_3 = createNode([-10.807424, 165.82254, 4.8]);
createEdge(URUKAZI_COAST_SOUTH_1, URUKAZI_COAST_SOUTH_2, []);
createEdge(URUKAZI_COAST_SOUTH_2, URUKAZI_COAST_SOUTH_3, []);
createEdge(URUKAZI_COAST_SOUTH_3, URUKAZI_COAST_SOUTH_1, []);

createEdge(
  URUKAZI_COAST_SOUTH_2,
  URUKAZI_COAST_NORTH_3,
  edgeUrukaziCoastCenter
);
createEdge(
  URUKAZI_COAST_NORTH_2,
  URUKAZI_NORTH_ISLE_EAST_2,
  edgeUrukaziCoastBridgeNorth
);
createEdge(
  URUKAZI_SOUTH_ISLE_EAST_2,
  URUKAZI_COAST_SOUTH_1,
  edgeUrukaziCoastBridgeSouth
);
createEdge(
  URUKAZI_NEOKYO_NORTH_1,
  URUKAZI_COAST_NORTH_1,
  edgeUrukaziNeokyoNorthConnector
);
createEdge(
  URUKAZI_COAST_SOUTH_3,
  URUKAZI_NEOKYO_SOUTH_1,
  edgeUrukaziNeokyoSouthConnector
);

export default ROADS;
