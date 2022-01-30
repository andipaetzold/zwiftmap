import { Roads } from "../../../types";
import edge1 from "./edges/1";
import edge2 from "./edges/2";
import edge3 from "./edges/3";
import { createEdge, createNode } from "./util";

const START_FINISH = createNode([48.867182, 2.316136, 48]);
const PADDOCK_EXIT = createNode([48.867579, 2.314281, 48.2]);
const PADDOCK_1 = createNode([48.865897, 2.312644, 48]);
const PADDOCK_2 = createNode([48.86579, 2.315323, 48]);
const PADDOCK_3 = createNode([48.86523, 2.312568, 48]);
const PADDOCK_4 = createNode([48.865117, 2.315277, 48]);
const PADDOCK_CENTER = createNode([48.864763, 2.313889, 48]);
const PADDOCK_ROW_FRONT = createNode([48.866585, 2.31407, 48]);
const PADDOCK_ROW_BACK = createNode([48.865904, 2.313979, 48]);

const roads: Roads = {
  nodes: [
    START_FINISH,
    PADDOCK_EXIT,
    PADDOCK_1,
    PADDOCK_2,
    PADDOCK_3,
    PADDOCK_4,
    PADDOCK_CENTER,
    PADDOCK_ROW_FRONT,
    PADDOCK_ROW_BACK,
  ],
  edges: [
    createEdge(START_FINISH, PADDOCK_EXIT, edge1),
    createEdge(PADDOCK_EXIT, START_FINISH, edge2),
    createEdge(PADDOCK_ROW_FRONT, PADDOCK_EXIT, edge3),
    createEdge(PADDOCK_1, PADDOCK_ROW_FRONT, []),
    createEdge(PADDOCK_2, PADDOCK_ROW_FRONT, []),
    createEdge(PADDOCK_ROW_BACK, PADDOCK_ROW_FRONT, []),
    createEdge(PADDOCK_3, PADDOCK_ROW_BACK, []),
    createEdge(PADDOCK_4, PADDOCK_ROW_BACK, []),
    createEdge(PADDOCK_CENTER, PADDOCK_ROW_BACK, []),
  ],
};

export default roads;
