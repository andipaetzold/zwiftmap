import { Roads } from "../../../services/Roads";
import edgeTempleKOM from "./edges/temple-kom";
import edgeTempleBypass from "./edges/temple-bypass";
import edgeTempleEntryNorth from "./edges/temple-entry-north";
import edgeTempleEntrySouth from "./edges/temple-entry-south";

const ROADS = new Roads();

// Temple
const TEMPLE_ENTRY_NORTH = ROADS.createNode([-10.747792, 165.854824, 0]);
const TEMPLE_ENTRY_SOUTH = ROADS.createNode([-10.758005, 165.849271, 0]);
const TEMPLE_BYPASS_NORTH = ROADS.createNode([-10.751153, 165.857172, 0]);
const TEMPLE_BYPASS_SOUTH = ROADS.createNode([-10.756155, 165.85237, 0]);
ROADS.createEdge(TEMPLE_BYPASS_SOUTH, TEMPLE_BYPASS_NORTH, edgeTempleKOM);
ROADS.createEdge(TEMPLE_BYPASS_NORTH, TEMPLE_BYPASS_SOUTH, edgeTempleBypass);
ROADS.createEdge(TEMPLE_ENTRY_NORTH, TEMPLE_BYPASS_NORTH, edgeTempleEntryNorth);
ROADS.createEdge(TEMPLE_BYPASS_SOUTH,TEMPLE_ENTRY_SOUTH, edgeTempleEntrySouth);

export default ROADS;
