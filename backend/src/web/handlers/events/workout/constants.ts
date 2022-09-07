import { Zone } from "./types.js";

// https://github.com/breiko83/zwo-editor/blob/master/src/components/Constants.js
export const COLORS = {
  LIGHT_GRAY: "#CCCCCC",
  GRAY: "#807F80",
  BLUE: "#0E90D4",
  GREEN: "#00C46A",
  YELLOW: "#FFCB00",
  ORANGE: "#FF6430",
  RED: "#E90000",
};

export const ZONES: ReadonlyArray<Zone> = [
  {
    min: -Infinity,
    max: 0.605,
    power: 0.605 / 2,
    color: COLORS.GRAY,
  },
  {
    min: 0.605,
    max: 0.763,
    power: (0.605 + 0.763) / 2,
    color: COLORS.BLUE,
  },
  {
    min: 0.763,
    max: 0.901,
    power: (0.763 + 0.901) / 2,
    color: COLORS.GREEN,
  },
  {
    min: 0.901,
    max: 1.053,
    power: (0.901 + 1.053) / 2,
    color: COLORS.YELLOW,
  },
  {
    min: 1.053,
    max: 1.194,
    power: (1.053 + 1.194) / 2,
    color: COLORS.ORANGE,
  },
  {
    min: 1.194,
    max: Infinity,
    power: 1.194 * 1.5,
    color: COLORS.RED,
  },
];
