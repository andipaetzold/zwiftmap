import { MetaActivity } from "./MetaActivity.js";
import { MetaAthlete } from "./MetaAthlete.js";
import { ResourceState } from "./ResourceState.js";

export interface Lap {
    id: number;
    resource_state: ResourceState;
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
    total_elevation_gain: number;
    average_speed: number;
    max_speed: number;
    average_heartrate: number;
    max_heartrate: number;
    lap_index: number;
    split: number;
    pace_zone: number;
}
