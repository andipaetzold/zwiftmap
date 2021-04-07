export interface Route {
  routeid: number;
  world: string;
  route: string;
  distance: number;
  elevation: number;
  leadindist: number;
  leadinelev: number;
  exp: number[];
  kom: string[];
  sprint: string[];
  lap: string[];
  stravaid: number;
  zilink: string;
  sport: "running" | 'cycling';
}
