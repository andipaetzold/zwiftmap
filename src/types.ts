export interface Route {
  world:
    | "Watopia"
    | "Richmond"
    | "Innsbruck"
    | "Paris"
    | "France"
    | "London"
    | "New York"
    | "Yorkshire";
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
  sport: "running" | "cycling";
}
