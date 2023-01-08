import { WorldSlug } from "zwift-data";

export interface Place {
  id: string;
  world: WorldSlug;
  name: string;
  position: [number, number];
  verified: boolean;
}
