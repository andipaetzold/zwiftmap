import {
  SurfaceType,
  SURFACE_TYPE_TARMAC,
  SURFACE_TYPE_BRICK,
  SURFACE_TYPE_WOOD,
  SURFACE_TYPE_COBBLES,
  SURFACE_TYPE_SNOW,
  SURFACE_TYPE_DIRT,
  SURFACE_TYPE_GRASS,
} from "../types";

export const SURFACE_CONSTANTS: Record<
  SurfaceType,
  {
    label: string;
    color: string;
  }
> = {
  [SURFACE_TYPE_TARMAC]: { label: "Tarmac", color: "#170809" },
  [SURFACE_TYPE_BRICK]: { label: "Brick", color: "#DC5539" },
  [SURFACE_TYPE_WOOD]: { label: "Wood", color: "#855E42" },
  [SURFACE_TYPE_COBBLES]: { label: "Cobbles", color: "#918E7D" },
  [SURFACE_TYPE_SNOW]: { label: "Snow", color: "#FFFAFA" },
  [SURFACE_TYPE_DIRT]: { label: "Dirt", color: "#9B7653" },
  [SURFACE_TYPE_GRASS]: { label: "Grass", color: "#567D46" },
};
