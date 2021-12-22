import { SurfaceType, WorldConfig } from "../../types";
import franceMap from "../../maps/france.png";

export const WORLD_CONFIG_FRANCE: WorldConfig = {
  initialBounds: [
    [-21.697812, 166.148225],
    [-21.744906, 166.202642],
  ],
  image: franceMap,
  backgroundColor: "#6f992d",
  surfaces: [
    {
      // bridge near start
      type: SurfaceType.Cobbles,
      polygon: [
        [-21.73782, 166.178963],
        [-21.737471, 166.17981],
        [-21.737053, 166.179531],
        [-21.737362, 166.178802],
        [-21.73782, 166.178963],
      ],
    },
    {
      // pave sprint
      type: SurfaceType.Cobbles,
      polygon: [
        [-21.699664, 166.174865],
        [-21.699065, 166.175366],
        [-21.697458, 166.17265],
        [-21.698966, 166.169729],
        [-21.699622, 166.170245],
        [-21.699664, 166.174865],
      ],
    },
    {
      // bridge to bottom-left island, from top
      type: SurfaceType.Cobbles,
      polygon: [
        [-21.73742, 166.15294],
        [-21.734989, 166.153593],
        [-21.734848, 166.152895],
        [-21.737201, 166.152318],
        [-21.73742, 166.15294],
      ],
    },
    {
      // bridge to bottom-left island, from right
      type: SurfaceType.Cobbles,
      polygon: [
        [-21.743226, 166.157136],
        [-21.742007, 166.158805],
        [-21.741592, 166.15838],
        [-21.742782, 166.156764],
        [-21.743226, 166.157136],
      ],
    },
  ],
};
