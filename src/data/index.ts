import { Route, Segment, World } from "../types";
import routesJSON from "./routes.json";
import segmentsJSON from "./segments.json";
import worldsJSON from "./worlds.json";

export const routes: ReadonlyArray<Route> = routesJSON as any;
export const segments: ReadonlyArray<Segment> = segmentsJSON as any;
export const worlds: ReadonlyArray<World> = worldsJSON as any;
