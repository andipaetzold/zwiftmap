import { Roads } from "../Roads.js";
import edgeVentoux from "./edges/ventoux.js";
import edgeOutside from "./edges/outside.js";
import edgeMiddle from "./edges/middle.js";
import edgePetitKOM from "./edges/petit-kom.js";
import edgeHarborPaddock from "./edges/harbor-paddock.js";
import edgeVentouxBottom from "./edges/ventoux-bottom.js";
import edgeVentouxBottom1 from "./edges/ventoux-bottom-1.js";
import edgeVentouxBottom2 from "./edges/ventoux-bottom-2.js";
import edgeVentouxBottom3 from "./edges/ventoux-bottom-3.js";
import edgeHarbor1 from "./edges/harbor-1.js";
import edgeHarbor2 from "./edges/harbor-2.js";
import edgeHarbor3 from "./edges/harbor-3.js";
import edgePetitKOM1 from "./edges/petit-kom-1.js";
import edgePetitKOM2 from "./edges/petit-kom-2.js";
import edgePetitKOM3 from "./edges/petit-kom-3.js";
import edgeVentoux1 from "./edges/ventoux-top-1.js";
import edgeVentoux2 from "./edges/ventoux-top-2.js";
import edgeVentoux3 from "./edges/ventoux-top-3.js";
import edgeVentoux4 from "./edges/ventoux-top-4.js";

const ROADS = new Roads();

// Ventoux
const VENTOUX_TOP_1 = ROADS.createNode([-21.656235, 166.205354, 1543]);
const VENTOUX_TOP_2 = ROADS.createNode([-21.655883, 166.205168, 1543]);
const VENTOUX_TOP_3 = ROADS.createNode([-21.656389, 166.204764, 1543]);
const VENTOUX_BOTTOM_1 = ROADS.createNode([-21.723701, 166.203036, 123]);
const VENTOUX_BOTTOM_2 = ROADS.createNode([-21.723982, 166.202612, 120.4]);
const VENTOUX_BOTTOM_3 = ROADS.createNode([-21.723599, 166.202572, 120.8]);

ROADS.createEdge(VENTOUX_TOP_1, VENTOUX_TOP_2, edgeVentoux1);
ROADS.createEdge(VENTOUX_TOP_3, VENTOUX_TOP_1, edgeVentoux2);
ROADS.createEdge(VENTOUX_TOP_2, VENTOUX_TOP_3, edgeVentoux3);
ROADS.createEdge(VENTOUX_TOP_2, VENTOUX_TOP_3, edgeVentoux4);
ROADS.createEdge(VENTOUX_BOTTOM_3, VENTOUX_BOTTOM_1, edgeVentouxBottom2);
ROADS.createEdge(VENTOUX_BOTTOM_2, VENTOUX_BOTTOM_1, edgeVentouxBottom1);
ROADS.createEdge(VENTOUX_BOTTOM_2, VENTOUX_BOTTOM_3, edgeVentouxBottom3);
ROADS.createEdge(VENTOUX_BOTTOM_1, VENTOUX_TOP_1, edgeVentoux);

// Paddock
const PADDOCK_EXIT = ROADS.createNode([-21.736575, 166.181479, 13]);
const PADDOCK_ROW_FRONT = ROADS.createNode([-21.737566, 166.1819, 13]);
const PADDOCK_ROW_BACK = ROADS.createNode([-21.738181, 166.182164, 13]);
const PADDOCK_CENTER = ROADS.createNode([-21.739298, 166.182661, 13]);
const PADDOCK_1 = ROADS.createNode([-21.738601, 166.181337, 13]);
const PADDOCK_2 = ROADS.createNode([-21.737935, 166.183089, 13]);
const PADDOCK_3 = ROADS.createNode([-21.739224, 166.181602, 13]);
const PADDOCK_4 = ROADS.createNode([-21.738565, 166.183355, 13]);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);

// Rest
const HARBOR_1 = ROADS.createNode([-21.737975, 166.177094, 13]);
const HARBOR_2 = ROADS.createNode([-21.738291, 166.176981, 13]);
const HARBOR_3 = ROADS.createNode([-21.738152, 166.177499, 13]);
ROADS.createEdge(HARBOR_1, HARBOR_2, edgeHarbor1);
ROADS.createEdge(HARBOR_3, HARBOR_1, edgeHarbor2);
ROADS.createEdge(HARBOR_3, HARBOR_2, edgeHarbor3);

const PETIT_KOM_1 = ROADS.createNode([-21.719191, 166.191921, 13]);
const PETIT_KOM_2 = ROADS.createNode([-21.719136, 166.192449, 13]);
const PETIT_KOM_3 = ROADS.createNode([-21.719614, 166.192168, 13]);
ROADS.createEdge(PETIT_KOM_2, PETIT_KOM_1, edgePetitKOM1);
ROADS.createEdge(PETIT_KOM_3, PETIT_KOM_2, edgePetitKOM2);
ROADS.createEdge(PETIT_KOM_1, PETIT_KOM_3, edgePetitKOM3);

ROADS.createEdge(HARBOR_1, PETIT_KOM_1, edgeMiddle);
ROADS.createEdge(HARBOR_2, PETIT_KOM_2, edgeOutside);
ROADS.createEdge(PETIT_KOM_3, VENTOUX_BOTTOM_3, edgePetitKOM);
ROADS.createEdge(HARBOR_3, PADDOCK_EXIT, edgeHarborPaddock);
ROADS.createEdge(PADDOCK_EXIT, VENTOUX_BOTTOM_2, edgeVentouxBottom);

export default ROADS;
