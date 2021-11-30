import { Zone } from "./types";

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
    color: COLORS.GRAY,
  },
  {
    min: 0.605,
    max: 0.763,
    color: COLORS.BLUE,
  },
  {
    min: 0.763,
    max: 0.901,
    color: COLORS.GREEN,
  },
  {
    min: 0.901,
    max: 1.053,
    color: COLORS.YELLOW,
  },
  {
    min: 1.053,
    max: 1.194,
    color: COLORS.ORANGE,
  },
  {
    min: 1.194,
    max: Infinity,
    color: COLORS.RED,
  },
];
