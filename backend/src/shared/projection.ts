import { LatLng } from "./types.js";

const EARTH_RADIUS = 6378137;
const MAX_LATITUDE = 85.0511287798;
const ONE_DEGREE_IN_RAD = Math.PI / 180;

/**
 * @see https://github.com/Leaflet/Leaflet/blob/0ea40738712c1746dd1ac11be7801bb934a62054/src/geo/projection/Projection.SphericalMercator.js
 */
export function project([lat, lng]: LatLng): [x: number, y: number] {
  const max = MAX_LATITUDE;
  lat = Math.max(Math.min(max, lat), -max);
  const sin = Math.sin(lat * ONE_DEGREE_IN_RAD);

  const x = EARTH_RADIUS * lng * ONE_DEGREE_IN_RAD;
  const y = (EARTH_RADIUS * Math.log((1 + sin) / (1 - sin))) / 2;

  return [x, -y];
}
