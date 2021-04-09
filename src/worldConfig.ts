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
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },

  innsbruck: {
    style: process.env.REACT_APP_MAPBOX_STYLE_INNSBRUCK!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },

  london: {
    style: process.env.REACT_APP_MAPBOX_STYLE_LONDON!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },

  "new-york": {
    style: process.env.REACT_APP_MAPBOX_STYLE_NEW_YORK!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },

  paris: {
    style: process.env.REACT_APP_MAPBOX_STYLE_PARIS!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },

  richmond: {
    style: process.env.REACT_APP_MAPBOX_STYLE_RICHMOND!,
    bounds: [
      [166.88, -11.7],
      [167.03, -11.63],
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
      [166.88, -11.7],
      [167.03, -11.63],
    ],
  },
};
