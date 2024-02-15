import { SurfaceType } from "../types";

export const SURFACE_CONSTANTS: Record<
  SurfaceType,
  {
    label: string;
    color: string;
  }
> = {
  [SurfaceType.Tarmac]: { label: "Tarmac", color: "#170809" },
  [SurfaceType.Brick]: { label: "Brick", color: "#DC5539" },
  [SurfaceType.Wood]: { label: "Wood", color: "#855E42" },
  [SurfaceType.Cobbles]: { label: "Cobbles", color: "#918E7D" },
  [SurfaceType.Snow]: { label: "Snow", color: "#FFFAFA" },
  [SurfaceType.Dirt]: { label: "Dirt", color: "#9B7653" },
  [SurfaceType.Grass]: { label: "Grass", color: "#567D46" },
  [SurfaceType.Sand]: { label: "Sand", color: "#C2B280" },
  [SurfaceType.Gravel]: { label: "Gravel", color: "#898989" },
};
