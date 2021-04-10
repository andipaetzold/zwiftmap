import { Route, Segment, World } from "../types";
import routesJSON from "./routes.json";
import segmentsJSON from "./segments.json";
import worldsJSON from "./worlds.json";

export const routes: Route[] = routesJSON as any;
export const segments: Segment[] = segmentsJSON as any;
export const worlds: World[] = worldsJSON as any;

