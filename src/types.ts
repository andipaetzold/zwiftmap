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
  zwiftInsiderUrl: string;
  sport: Sport;
}

export type Sport = "running" | "cycling";
export type World =
  | "Watopia"
  | "Richmond"
  | "Innsbruck"
  | "Paris"
  | "France"
  | "London"
  | "New York"
  | "Yorkshire";
