export interface Route {
  world: World;
  name: string;
  slug: string;
  distance: number;
  elevation: number;
  leadInDistance: number;
  leadInElevation: number;
  experience: number[];
  kom: string[];
  sprint: string[];
  lap: string[];
  stravaSegmentId?: number;
  stravaSegmentUrl?: string;
  zwiftInsiderUrl: string;
  sport: Sport;
}

export type Sport = "running" | "cycling";
export type World =
  | "crit-city"
  | "france"
  | "innsbruck"
  | "london"
  | "paris"
  | "new-york"
  | "richmond"
  | "watopia"
  | "yorkshire";

export interface Segment {
  latlng: Array<[number, number]>;
  distance: number[];
  altitude: number[];
}
