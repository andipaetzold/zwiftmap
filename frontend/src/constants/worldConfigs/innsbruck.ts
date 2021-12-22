import { SurfaceType, WorldConfig } from "../../types";
import innsbruckMap from "../../maps/innsbruck.png";

export const WORLD_CONFIG_INNSBRUCK: WorldConfig = {
  initialBounds: [
    [47.280902, 11.386414],
    [47.214544, 11.445934],
  ],
  image: innsbruckMap,
  backgroundColor: "#7c9938",
  surfaces: [
    {
      type: SurfaceType.Brick,
      polygon: [
        [47.268528, 11.391566],
        [47.266103, 11.393669],
        [47.266198, 11.394292],
        [47.268761, 11.393283],
        [47.268528, 11.391566],
      ],
    },
    {
      type: SurfaceType.Cobbles,
      polygon: [
        [47.266103, 11.393669],
        [47.264146, 11.394469],
        [47.264116, 11.395296],
        [47.266198, 11.394292],
        [47.266103, 11.393669],
      ],
    },
  ],
};
