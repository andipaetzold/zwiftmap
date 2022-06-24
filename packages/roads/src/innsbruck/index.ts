import { Roads } from "../Roads.js";
import edgeLutscher from "./edges/lutscher.js";
import edgeLutscherRoundabout1 from "./edges/lutscher-roundabout-1.js";
import edgeLutscherRoundabout2 from "./edges/lutscher-roundabout-2.js";
import edgeLutscherRoundabout3 from "./edges/lutscher-roundabout-3.js";
import edgeRoundabout1 from "./edges/roundabout-1.js";
import edgeRoundabout2 from "./edges/roundabout-2.js";
import edgeRoundabout3 from "./edges/roundabout-3.js";
import edgeRing from "./edges/ring.js";
import edgeMiddle from "./edges/middle.js";

const ROADS = new Roads();

const LUTSCHER_ROUNDABOUT_1 = ROADS.createNode([47.253996, 11.413398, 297.2]);
const LUTSCHER_ROUNDABOUT_2 = ROADS.createNode([47.25336, 11.412977, 297.4]);
const LUTSCHER_ROUNDABOUT_3 = ROADS.createNode([47.253533, 11.414195, 297.4]);
ROADS.createEdge(LUTSCHER_ROUNDABOUT_2, LUTSCHER_ROUNDABOUT_3, edgeLutscher);
ROADS.createEdge(
  LUTSCHER_ROUNDABOUT_1,
  LUTSCHER_ROUNDABOUT_3,
  edgeLutscherRoundabout1
);
ROADS.createEdge(
  LUTSCHER_ROUNDABOUT_2,
  LUTSCHER_ROUNDABOUT_3,
  edgeLutscherRoundabout2
);
ROADS.createEdge(
  LUTSCHER_ROUNDABOUT_2,
  LUTSCHER_ROUNDABOUT_1,
  edgeLutscherRoundabout3
);

const ROUNDABOUT_1 = ROADS.createNode([47.258317, 11.411528, 282.2]);
const ROUNDABOUT_2 = ROADS.createNode([47.259081, 11.410863, 282.6]);
const ROUNDABOUT_3 = ROADS.createNode([47.258604, 11.410401, 281.6]);
ROADS.createEdge(ROUNDABOUT_2, ROUNDABOUT_1, edgeRoundabout1);
ROADS.createEdge(ROUNDABOUT_2, ROUNDABOUT_3, edgeRoundabout2);
ROADS.createEdge(ROUNDABOUT_1, ROUNDABOUT_3, edgeRoundabout3);
ROADS.createEdge(ROUNDABOUT_3, ROUNDABOUT_2, edgeRing);

ROADS.createEdge(ROUNDABOUT_1, LUTSCHER_ROUNDABOUT_1, edgeMiddle);

export default ROADS;
