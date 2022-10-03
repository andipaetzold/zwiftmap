import { ZONES } from "./constants.js";

export function getColorForPower(power: number): string {
  return ZONES.find((zone) => power >= zone.min && power < zone.max)!.color;
}

export function getPowerForZone(zone: number): number {
  return ZONES[Math.min(Math.max(zone - 1, 0), ZONES.length - 1)].power;
}
