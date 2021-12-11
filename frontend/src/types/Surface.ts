// https://zwiftinsider.com/crr

export const SURFACE_TARMAC = "tarmac";
export const SURFACE_BRICK = "brick";
export const SURFACE_WOOD = "wood";
export const SURFACE_COBBLES = "cobbles";
export const SURFACE_SNOW = "snow";
export const SURFACE_DIRT = "dirt";
export const SURFACE_GRASS = "grass";

export const SURFACES: Surface[] = [
  "tarmac",
  "brick",
  "wood",
  "cobbles",
  "snow",
  "dirt",
  "grass",
];

export type Surface =
  | typeof SURFACE_TARMAC
  | typeof SURFACE_BRICK
  | typeof SURFACE_WOOD
  | typeof SURFACE_COBBLES
  | typeof SURFACE_SNOW
  | typeof SURFACE_DIRT
  | typeof SURFACE_GRASS;

export const BIKE_ROAD = Symbol("Road");
export const BIKE_MTB = Symbol("MTB");
export const BIKE_GRAVEL = Symbol("Gravel");

export type Bike = typeof BIKE_ROAD | typeof BIKE_MTB | typeof BIKE_GRAVEL;
