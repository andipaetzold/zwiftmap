import { SurfaceType, WorldConfig } from "../../types";
import londonMap from "../../maps/london.png";

export const WORLD_CONFIG_LONDON: WorldConfig = {
  initialBounds: [
    [51.511261, -0.134875],
    [51.489256, -0.072996],
  ],
  image: londonMap,
  backgroundColor: "#6f992d",
  surfaces: [
    {
      // left entry from city 1
      type: SurfaceType.Cobbles,
      polygon: [
        [51.495266, -0.119761],
        [51.494742, -0.119898],
        [51.494619, -0.118964],
        [51.49512, -0.118789],
        [51.495266, -0.119761],
      ],
    },
    {
      // left entry from city 2
      type: SurfaceType.Wood,
      polygon: [
        [51.49512, -0.118789],
        [51.494619, -0.118964],
        [51.494557, -0.117877],
        [51.495004, -0.117694],
        [51.49512, -0.118789],
      ],
    },
    {
      // left entry from city 3
      type: SurfaceType.Cobbles,
      polygon: [
        [51.495004, -0.117694],
        [51.494557, -0.117877],
        [51.49445, -0.117533],
        [51.4944, -0.116959],
        [51.494881, -0.116814],
        [51.495004, -0.117694],
      ],
    },
    {
      // left entry from city 4
      type: SurfaceType.Wood,
      polygon: [
        [51.4944, -0.116959],
        [51.49445, -0.117533],
        [51.493666, -0.117672],
        [51.492642, -0.113203],
        [51.494539, -0.112387],
        [51.495046, -0.112108],
        [51.4944, -0.116959],
      ],
    },
    {
      // right exit towards city 1
      type: SurfaceType.Wood,
      polygon: [
        [51.500737, -0.077306],
        [51.501247, -0.077063],
        [51.501341, -0.078034],
        [51.498716, -0.079264],
        [51.498753, -0.076364],
        [51.499585, -0.073389],
        [51.499575, -0.072721],
        [51.500321, -0.072311],
        [51.500737, -0.077306],
      ],
    },
    {
      // right exit towards city 2
      type: SurfaceType.Cobbles,
      polygon: [
        [51.501118, -0.076973],
        [51.500717, -0.077163],
        [51.500622, -0.076639],
        [51.501028, -0.076389],
        [51.501118, -0.076973],
      ],
    },
    {
      // right exit towards city 3
      type: SurfaceType.Wood,
      polygon: [
        [51.501118, -0.076973],
        [51.501028, -0.076389],
        [51.501886, -0.075871],
        [51.502039, -0.076558],
        [51.501118, -0.076973],
      ],
    },
    {
      // right exit towards city 4
      type: SurfaceType.Cobbles,
      polygon: [
        [51.502039, -0.076558],
        [51.501886, -0.075871],
        [51.502409, -0.075603],
        [51.502524, -0.076191],
        [51.502039, -0.076558],
      ],
    },
  ],
};
