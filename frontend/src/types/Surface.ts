// https://zwiftinsider.com/crr

export const SURFACE_TYPE_TARMAC = "tarmac";
export const SURFACE_TYPE_BRICK = "brick";
export const SURFACE_TYPE_WOOD = "wood";
export const SURFACE_TYPE_COBBLES = "cobbles";
export const SURFACE_TYPE_SNOW = "snow";
export const SURFACE_TYPE_DIRT = "dirt";
export const SURFACE_TYPE_GRASS = "grass";

export const SURFACE_TYPES: SurfaceType[] = [
  "tarmac",
  "brick",
  "wood",
  "cobbles",
  "snow",
  "dirt",
  "grass",
];

export type SurfaceType =
  | typeof SURFACE_TYPE_TARMAC
  | typeof SURFACE_TYPE_BRICK
  | typeof SURFACE_TYPE_WOOD
  | typeof SURFACE_TYPE_COBBLES
  | typeof SURFACE_TYPE_SNOW
  | typeof SURFACE_TYPE_DIRT
  | typeof SURFACE_TYPE_GRASS;

export const BIKE_ROAD = Symbol("Road");
export const BIKE_MTB = Symbol("MTB");
export const BIKE_GRAVEL = Symbol("Gravel");

export type Bike = typeof BIKE_ROAD | typeof BIKE_MTB | typeof BIKE_GRAVEL;
