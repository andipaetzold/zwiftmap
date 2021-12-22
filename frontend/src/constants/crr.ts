import { Bike, SurfaceType } from "../types";

export const CRR: Record<SurfaceType, Record<Bike, number | null>> = {
  [SurfaceType.Tarmac]: {
    [Bike.Road]: 0.004,
    [Bike.MTB]: 0.01,
    [Bike.Gravel]: 0.008,
  },
  [SurfaceType.Brick]: {
    [Bike.Road]: 0.0055,
    [Bike.MTB]: 0.01,
    [Bike.Gravel]: 0.008,
  },
  [SurfaceType.Wood]: {
    [Bike.Road]: 0.0065,
    [Bike.MTB]: 0.01,
    [Bike.Gravel]: 0.008,
  },
  [SurfaceType.Cobbles]: {
    [Bike.Road]: 0.0065,
    [Bike.MTB]: 0.01,
    [Bike.Gravel]: 0.008,
  },
  [SurfaceType.Snow]: {
    [Bike.Road]: 0.0075,
    [Bike.MTB]: 0.014,
    [Bike.Gravel]: 0.018,
  },
  [SurfaceType.Dirt]: {
    [Bike.Road]: 0.025,
    [Bike.MTB]: 0.014,
    [Bike.Gravel]: 0.018,
  },
  [SurfaceType.Grass]: {
    [Bike.Road]: null,
    [Bike.MTB]: 0.042,
    [Bike.Gravel]: null,
  },
};
