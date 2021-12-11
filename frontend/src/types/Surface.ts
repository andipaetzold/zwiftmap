// https://zwiftinsider.com/crr

export const SURFACE_PAVEMENT = Symbol("Pavement");
export const SURFACE_BRICK = Symbol("Brick");
export const SURFACE_WOOD = Symbol("Wood");
export const SURFACE_COBBLES = Symbol("Cobbles");
export const SURFACE_SNOW = Symbol("Snow");
export const SURFACE_DIRT = Symbol("Dirt");
export const SURFACE_GRASS = Symbol("Grass");

export type Surface =
  | typeof SURFACE_PAVEMENT
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

export const CRR: Record<Surface, Record<Bike, number | null>> = {
  [SURFACE_PAVEMENT]: {
    [BIKE_ROAD]: 0.004,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_BRICK]: {
    [BIKE_ROAD]: 0.0055,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_WOOD]: {
    [BIKE_ROAD]: 0.0065,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_COBBLES]: {
    [BIKE_ROAD]: 0.0065,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_SNOW]: {
    [BIKE_ROAD]: 0.0075,
    [BIKE_MTB]: 0.014,
    [BIKE_GRAVEL]: 0.018,
  },
  [SURFACE_DIRT]: {
    [BIKE_ROAD]: 0.025,
    [BIKE_MTB]: 0.014,
    [BIKE_GRAVEL]: 0.018,
  },
  [SURFACE_GRASS]: {
    [BIKE_ROAD]: null,
    [BIKE_MTB]: 0.042,
    [BIKE_GRAVEL]: null,
  },
};
