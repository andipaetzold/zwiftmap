import { ZONES } from "./constants";

export function getColorForPower(power: number): string {
  return ZONES.find((zone) => power >= zone.min && power < zone.max)!.color;
}
