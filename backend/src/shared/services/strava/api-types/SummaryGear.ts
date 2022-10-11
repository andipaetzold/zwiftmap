import { ResourceState } from "./ResourceState.js";

export interface SummaryGear {
  id: string;
  primary: boolean;
  name: string;
  resource_state: ResourceState.Summary;
  distance: number;
}
