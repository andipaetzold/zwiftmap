import { ResourceState } from "./ResourceState.js";

export interface SimilarActivity {
  effort_count: number;
  average_speed: number;
  min_average_speed: number;
  mid_average_speed: number;
  max_average_speed: number;
  pr_rank: string;
  frequency_milestone: string;
  trend: {
    speeds: number[];
    current_activity_index: number;
    min_speed: number;
    mid_speed: number;
    max_speed: number;
    direction: number;
  };
  resource_state: ResourceState;
}
