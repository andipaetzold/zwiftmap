import { ResourceState } from "./ResourceState.js";

export interface MetaPolylineMap {
  id: string;
  resource_state: ResourceState.Meta;
}

export interface SummaryPolylineMap {
  id: string;
  resource_state: ResourceState.Summary;
  summary_polyline: string;
}

export interface DetailedPolylineMap {
  id: string;
  polyline: string;
  resource_state: ResourceState.Detail;
  summary_polyline: string;
}
