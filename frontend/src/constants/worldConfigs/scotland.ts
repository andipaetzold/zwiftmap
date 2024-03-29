import scotlandMap from "../../maps/scotland.png";
import { SurfaceType, WorldConfig } from "../../types";

export const WORLD_CONFIG_SCOTLAND: WorldConfig = {
  initialBounds: [
    [55.635388, -5.244622],
    [55.659061, -5.213581],
  ],
  image: scotlandMap,
  backgroundColor: "#aba73a",
  surfaces: [
    {
      // sout bridge
      type: SurfaceType.Cobbles,
      polygon: [
        [55.636402, -5.229127],
        [55.63656, -5.229015],
        [55.636584, -5.228741],
        [55.636402, -5.228822],
        [55.636402, -5.229127],
      ],
    },
    {
      // east roundabout
      type: SurfaceType.Cobbles,
      polygon: [
        [55.643342, -5.223869],
        [55.643726, -5.222706],
        [55.64379, -5.222309],
        [55.643735, -5.221767],
        [55.643233, -5.221328],
        [55.643007, -5.222108],
        [55.64299, -5.222492],
        [55.643184, -5.223873],
        [55.643342, -5.223869],
      ],
    },
    {
      // Sgurr Summit North
      type: SurfaceType.Gravel,
      polygon: [
        [55.642563, -5.228466],
        [55.642434, -5.228633],
        [55.642148, -5.229096],
        [55.642186, -5.229604],
        [55.64243, -5.229991],
        [55.643132, -5.230249],
        [55.643946, -5.228413],
        [55.644507, -5.226122],
        [55.643342, -5.223869],
        [55.643184, -5.223873],
        [55.641886, -5.224301],
        [55.641488, -5.226562],
        [55.641535, -5.227586],
        [55.642614, -5.228315],
        [55.642563, -5.228466],
      ],
    },
  ],
};
