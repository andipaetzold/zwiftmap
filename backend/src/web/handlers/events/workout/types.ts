export interface Zone {
  /**
   * inclusive
   */
  min: number;
  /**
   * exclusive
   */
  max: number;

  /**
   * Fixed power for this zone
   */
  power: number;

  color: string;
}

export type Interval = BarInterval | RampInterval | FreeRideInterval;

export interface BarInterval {
  type: "bar";
  duration: number;
  power: number;
}

export interface RampInterval {
  type: "ramp";
  duration: number;
  from: number;
  to: number;
}

export interface FreeRideInterval {
  type: "free-ride";
  duration: number;
}
