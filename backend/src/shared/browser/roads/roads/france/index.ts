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
const createNode = ROADS.createNode.bind(ROADS);
const createEdge = ROADS.createEdge.bind(ROADS);

// Ventoux
const VENTOUX_TOP_1 = createNode([-21.656235, 166.205354, 1543]);
const VENTOUX_TOP_2 = createNode([-21.655883, 166.205168, 1543]);
const VENTOUX_TOP_3 = createNode([-21.656389, 166.204764, 1543]);
const VENTOUX_BOTTOM_1 = createNode([-21.723701, 166.203036, 123]);
const VENTOUX_BOTTOM_2 = createNode([-21.723982, 166.202612, 120.4]);
const VENTOUX_BOTTOM_3 = createNode([-21.723599, 166.202572, 120.8]);

createEdge(VENTOUX_TOP_1, VENTOUX_TOP_2, edgeVentoux1);
createEdge(VENTOUX_TOP_3, VENTOUX_TOP_1, edgeVentoux2);
createEdge(VENTOUX_TOP_2, VENTOUX_TOP_3, edgeVentoux3);
createEdge(VENTOUX_TOP_2, VENTOUX_TOP_3, edgeVentoux4);
createEdge(VENTOUX_BOTTOM_3, VENTOUX_BOTTOM_1, edgeVentouxBottom2);
createEdge(VENTOUX_BOTTOM_2, VENTOUX_BOTTOM_1, edgeVentouxBottom1);
createEdge(VENTOUX_BOTTOM_2, VENTOUX_BOTTOM_3, edgeVentouxBottom3);
createEdge(VENTOUX_BOTTOM_1, VENTOUX_TOP_1, edgeVentoux);

// Paddock
const PADDOCK_EXIT = createNode([-21.736575, 166.181479, 13]);
const PADDOCK_ROW_FRONT = createNode([-21.737566, 166.1819, 13]);
const PADDOCK_ROW_BACK = createNode([-21.738181, 166.182164, 13]);
const PADDOCK_CENTER = createNode([-21.739298, 166.182661, 13]);
const PADDOCK_1 = createNode([-21.738601, 166.181337, 13]);
const PADDOCK_2 = createNode([-21.737935, 166.183089, 13]);
const PADDOCK_3 = createNode([-21.739224, 166.181602, 13]);
const PADDOCK_4 = createNode([-21.738565, 166.183355, 13]);
createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, [], false);
createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, [], false);
createEdge(PADDOCK_3, PADDOCK_ROW_BACK, [], false);
createEdge(PADDOCK_4, PADDOCK_ROW_BACK, [], false);

// Rest
const HARBOR_1 = createNode([-21.737975, 166.177094, 13]);
const HARBOR_2 = createNode([-21.738291, 166.176981, 13]);
const HARBOR_3 = createNode([-21.738152, 166.177499, 13]);
createEdge(HARBOR_1, HARBOR_2, edgeHarbor1);
createEdge(HARBOR_3, HARBOR_1, edgeHarbor2);
createEdge(HARBOR_3, HARBOR_2, edgeHarbor3);

const PETIT_KOM_1 = createNode([-21.719191, 166.191921, 13]);
const PETIT_KOM_2 = createNode([-21.719136, 166.192449, 13]);
const PETIT_KOM_3 = createNode([-21.719614, 166.192168, 13]);
createEdge(PETIT_KOM_2, PETIT_KOM_1, edgePetitKOM1);
createEdge(PETIT_KOM_3, PETIT_KOM_2, edgePetitKOM2);
createEdge(PETIT_KOM_1, PETIT_KOM_3, edgePetitKOM3);

createEdge(HARBOR_1, PETIT_KOM_1, edgeMiddle);
createEdge(HARBOR_2, PETIT_KOM_2, edgeOutside);
createEdge(PETIT_KOM_3, VENTOUX_BOTTOM_3, edgePetitKOM);
createEdge(HARBOR_3, PADDOCK_EXIT, edgeHarborPaddock);
createEdge(PADDOCK_EXIT, VENTOUX_BOTTOM_2, edgeVentouxBottom);

export default ROADS;
