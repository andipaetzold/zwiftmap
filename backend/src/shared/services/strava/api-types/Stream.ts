import { LatLng } from "../../../types.js";
import { StreamKey } from "./StreamKey.js";

export interface BaseStream<TStreamKey extends StreamKey, Data> {
  type: TStreamKey;
  original_size: number;
  resolution: "low" | "medium" | "high";
  series_type: "distance" | "time";
  data: Data[];
}
export declare type Stream = BaseStream<
  | "time"
  | "distance"
  | "altitude"
  | "velocity_smooth"
  | "heartrate"
  | "cadence"
  | "watts"
  | "temp"
  | "moving"
  | "grade_smooth",
  number
>;
export declare type LatLngStream = BaseStream<"latlng", LatLng>;
