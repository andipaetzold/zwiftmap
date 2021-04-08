export interface Route {
  id: number;
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
  stravaSegmentId: number;
  zwiftInsiderSlug: string;
  sport: "running" | "cycling";
}
