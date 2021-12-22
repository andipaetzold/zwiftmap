import { SurfaceType, WorldConfig } from "../../types";
import parisMap from "../../maps/paris.png";

export const WORLD_CONFIG_PARIS: WorldConfig = {
  initialBounds: [
    [48.874328, 2.294207],
    [48.860895, 2.331992],
  ],
  image: parisMap,
  backgroundColor: "#b9b9b9",
  surfaces: [
    {
      // whole world
      type: SurfaceType.Cobbles,
      polygon: [
        [48.9058, 2.2561],
        [48.9058, 2.3722],
        [48.82945, 2.3722],
        [48.82945, 2.2561],
        [48.9058, 2.2561],
      ],
    },
  ],
};
