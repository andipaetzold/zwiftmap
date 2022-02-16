import { Roads } from "../../../services/Roads";

const ROADS = new Roads();

// Paddock
const PADDOCK_EXIT = ROADS.createNode([40.777649, -73.966935, 33.6]);
const PADDOCK_ROW_BACK = ROADS.createNode([40.777877, -73.969241, 33.6]);
const PADDOCK_ROW_FRONT = ROADS.createNode([40.777804, -73.968287, 33.6]);
const PADDOCK_1 = ROADS.createNode([40.77708, -73.969456, 33.6]);
const PADDOCK_2 = ROADS.createNode([40.778681, -73.969113, 33.6]);
const PADDOCK_3 = ROADS.createNode([40.777194, -73.970346, 33.6]);
const PADDOCK_4 = ROADS.createNode([40.778819, -73.970014, 33.6]);
const PADDOCK_CENTER = ROADS.createNode([40.778015, -73.970475, 33.6]);
ROADS.createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, []);
ROADS.createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []);
ROADS.createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []);
ROADS.createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []);

export default ROADS;
