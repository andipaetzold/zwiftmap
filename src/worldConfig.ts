import type { FitBounds } from "react-mapbox-gl/lib/map";
import { World } from "./types";

export type WorldConfig = {
  style: string;
  bounds: FitBounds;
};

export const worldConfigs: Record<World, WorldConfig> = {
  "crit-city": {
    style: process.env.REACT_APP_MAPBOX_STYLE_CRIT_CITY!,
    bounds: [
      [165.78, -10.4],
      [165.82, -10.37],
    ],
  },

  france: {
    style: process.env.REACT_APP_MAPBOX_STYLE_FRANCE!,
    bounds: [
      [166.14, -21.76],
      [166.26, -21.64],
    ],
  },

  innsbruck: {
    style: process.env.REACT_APP_MAPBOX_STYLE_INNSBRUCK!,
    bounds: [
      [11.35, 47.21],
      [11.48, 47.29],
    ],
  },

  london: {
    style: process.env.REACT_APP_MAPBOX_STYLE_LONDON!,
    bounds: [
      [-0.17, 51.46],
      [-0.06, 51.53],
    ],
  },

  "new-york": {
    style: process.env.REACT_APP_MAPBOX_STYLE_NEW_YORK!,
    bounds: [
      [-74.02, 40.74],
      [-73.92, 40.82],
    ],
  },

  paris: {
    style: process.env.REACT_APP_MAPBOX_STYLE_PARIS!,
    bounds: [
      [2.25, 48.83],
      [2.37, 48.91],
    ],
  },

  richmond: {
    style: process.env.REACT_APP_MAPBOX_STYLE_RICHMOND!,
    bounds: [
      [-77.49, 37.5],
      [-77.39, 37.58],
    ],
  },

  watopia: {
    style: process.env.REACT_APP_MAPBOX_STYLE_WATOPIA!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },
  yorkshire: {
    style: process.env.REACT_APP_MAPBOX_STYLE_YORKSHIRE!,
    bounds: [
      [-1.63, 53.95],
      [-1.5, 54.03],
    ],
  },
};
