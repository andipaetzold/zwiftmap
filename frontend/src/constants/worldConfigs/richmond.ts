import { SurfaceType, WorldConfig } from "../../types";
import richmondMap from "../../maps/richmond.png";

export const WORLD_CONFIG_RICHMOND: WorldConfig = {
  initialBounds: [
    [37.558393, -77.467668],
    [37.520429, -77.415864],
  ],
  image: richmondMap,
  backgroundColor: "#7c9938",
  surfaces: [
    {
      // top left
      type: SurfaceType.Cobbles,
      polygon: [
        [37.552037, -77.457716],
        [37.552969, -77.456601],
        [37.560331, -77.466994],
        [37.557636, -77.469665],
        [37.552258, -77.458398],
        [37.552037, -77.457716],
      ],
    },
    {
      // KOM
      type: SurfaceType.Cobbles,
      polygon: [
        [37.527933, -77.419275],
        [37.527265, -77.418585],
        [37.526495, -77.417553],
        [37.527067, -77.416833],
        [37.527464, -77.417485],
        [37.527662, -77.417273],
        [37.528059, -77.417804],
        [37.528486, -77.418464],
        [37.527933, -77.419275],
      ],
    },
    {
      // 23rd street
      type: SurfaceType.Cobbles,
      polygon: [
        [37.531275, -77.422526],
        [37.530939, -77.421834],
        [37.531777, -77.421024],
        [37.532084, -77.421673],
        [37.531275, -77.422526],
      ],
    },
  ],
};
