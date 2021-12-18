import { SegmentType } from "zwift-data";
import {
  Bike,
  BIKE_GRAVEL,
  BIKE_MTB,
  BIKE_ROAD,
  SurfaceType,
  SURFACE_TYPE_BRICK,
  SURFACE_TYPE_COBBLES,
  SURFACE_TYPE_DIRT,
  SURFACE_TYPE_GRASS,
  SURFACE_TYPE_SNOW,
  SURFACE_TYPE_TARMAC,
  SURFACE_TYPE_WOOD,
} from "./types";

export const FORMAT_INCLINE = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  style: "percent",
});

export const COLORS = {
  regular: "var(--rmd-theme-text-primary-on-background)",
  sprintSegment: "#56A845",
  komSegment: "#ed2324",
  lapSegment: "#fc6719",
  previewRoute: "#D3D3D3",
  route: "#fc6719",
};

export function getSegmentColor(type: SegmentType) {
  switch (type) {
    case "climb":
      return COLORS.komSegment;
    case "sprint":
      return COLORS.sprintSegment;
    case "segment":
      return COLORS.lapSegment;
  }
}

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

export const CRR: Record<SurfaceType, Record<Bike, number | null>> = {
  [SURFACE_TYPE_TARMAC]: {
    [BIKE_ROAD]: 0.004,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_TYPE_BRICK]: {
    [BIKE_ROAD]: 0.0055,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_TYPE_WOOD]: {
    [BIKE_ROAD]: 0.0065,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_TYPE_COBBLES]: {
    [BIKE_ROAD]: 0.0065,
    [BIKE_MTB]: 0.01,
    [BIKE_GRAVEL]: 0.008,
  },
  [SURFACE_TYPE_SNOW]: {
    [BIKE_ROAD]: 0.0075,
    [BIKE_MTB]: 0.014,
    [BIKE_GRAVEL]: 0.018,
  },
  [SURFACE_TYPE_DIRT]: {
    [BIKE_ROAD]: 0.025,
    [BIKE_MTB]: 0.014,
    [BIKE_GRAVEL]: 0.018,
  },
  [SURFACE_TYPE_GRASS]: {
    [BIKE_ROAD]: null,
    [BIKE_MTB]: 0.042,
    [BIKE_GRAVEL]: null,
  },
};
