import { SurfaceType, WorldConfig } from "../../types";
import critCityMap from "../../maps/crit-city.png";

export const WORLD_CONFIG_CRIT_CITY: WorldConfig = {
  initialBounds: [
    [-10.382352, 165.798758],
    [-10.386016, 165.803496],
  ],
  image: critCityMap,
  backgroundColor: "#7c9938",
  surfaces: [
    {
      type: SurfaceType.Brick,
      polygon: [
        [-10.385806, 165.799698],
        [-10.385804, 165.80094],
        [-10.385142, 165.800938],
        [-10.385152, 165.799701],
        [-10.385806, 165.799698],
      ],
    },
  ],
};
