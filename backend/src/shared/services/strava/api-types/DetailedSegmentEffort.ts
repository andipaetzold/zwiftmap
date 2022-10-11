import { Achievement } from "./Achievement.js";
import { MetaActivity } from "./MetaActivity.js";
import { MetaAthlete } from "./MetaAthlete.js";
import { ResourceState } from "./ResourceState.js";

export interface DetailedSegmentEffort {
    id: number;
    resource_state: ResourceState.Detail;
    name: string;
    activity: MetaActivity;
    athlete: MetaAthlete;
    elapsed_time: number;
    moving_time: number;
    start_date: string;
    start_date_local: string;
    distance: number;
    start_index: number;
    end_index: number;
    pr_rank: string;
    achievements: Achievement[];
}
