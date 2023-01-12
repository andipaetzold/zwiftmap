import { WorldSlug } from "zwift-data";

export interface Place {
  id: string;
  world: WorldSlug;
  name: string;
  description: string;
  links: string[];
  position: [number, number];
  verified: boolean;
  image: string;
}
