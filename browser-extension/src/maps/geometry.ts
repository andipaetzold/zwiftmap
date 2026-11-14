import { World } from "zwift-data";

export interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const mercatorX = (longitude: number) => (longitude + 180) / 360;
const mercatorY = (latitude: number) =>
  (1 - Math.asinh(Math.tan((latitude * Math.PI) / 180)) / Math.PI) / 2;

export function worldRectangle(bounds: World["bounds"]): Rectangle {
  const [[north, west], [south, east]] = bounds;
  return {
    left: mercatorX(west),
    top: mercatorY(north),
    right: mercatorX(east),
    bottom: mercatorY(south),
  };
}

export function tileRectangle(quadkey: string): Rectangle {
  let x = 0,
    y = 0;
  for (const digit of quadkey) {
    x = x * 2 + (Number(digit) & 1);
    y = y * 2 + ((Number(digit) >> 1) & 1);
  }
  const count = 2 ** quadkey.length;
  return {
    left: x / count,
    top: y / count,
    right: (x + 1) / count,
    bottom: (y + 1) / count,
  };
}

export function intersects(a: Rectangle, b: Rectangle): boolean {
  return (
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
  );
}

export function contains(
  bounds: World["bounds"],
  latitude: number,
  longitude: number,
): boolean {
  const [[north, west], [south, east]] = bounds;
  return (
    latitude <= north &&
    latitude >= south &&
    longitude >= west &&
    longitude <= east
  );
}
