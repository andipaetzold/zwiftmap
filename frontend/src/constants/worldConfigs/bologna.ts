import { SurfaceType, WorldConfig } from "../../types";
import bolognaMap from "../../maps/bologna.png";

export const WORLD_CONFIG_BOLOGNA: WorldConfig = {
  initialBounds: [
    [44.501423, 11.294653],
    [44.478222, 11.341099],
  ],
  image: bolognaMap,
  backgroundColor: "#b9b9b8",
  surfaces: [
    {
      type: SurfaceType.Brick,
      polygon: [
        [44.497632, 11.331145],
        [44.498027, 11.331479],
        [44.499294, 11.327853],
        [44.498899, 11.327512],
        [44.497632, 11.331145],
      ],
    },
  ],
};
