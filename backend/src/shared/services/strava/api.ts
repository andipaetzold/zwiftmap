import { AxiosInstance } from "axios";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { getStravaUserAPI } from "./userApi.js";

interface GetActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export class StravaUserAPI {
  #axiosInstance: Promise<AxiosInstance>;

  constructor(readonly athleteId: number) {
    this.#axiosInstance = getStravaUserAPI(athleteId);
  }

  async getActivityById(activityId: number) {
    const api = await this.#axiosInstance;
    const response = await api.get<DetailedActivity>(
      `/activities/${activityId}`
    );
    return response.data;
  }

  async getActivityStreams(activityId: number) {
    const api = await this.#axiosInstance;
    const response = await api.get<Partial<StreamSet>>(
      `/activities/${activityId}/streams`,
      {
        params: {
          keys: [
            "distance",
            "latlng",
            "time",
            "altitude",
            "watts",
            "velocity_smooth",
            "watts",
            "cadence",
            "heartrate",
          ].join(","),
          key_by_type: true,
        },
      }
    );
    return response.data;
  }

  async getActivities(params: GetActivitiesParams): Promise<SummaryActivity[]> {
    const api = await this.#axiosInstance;
    const response = await api.get<SummaryActivity[]>(`/athlete/activities`, {
      params,
    });
    return response.data;
  }

  async updateActivity(
    activityId: number,
    activity: Partial<Pick<DetailedActivity, "description">>
  ): Promise<DetailedActivity> {
    const api = await this.#axiosInstance;
    const response = await api.put<DetailedActivity>(
      `/activities/${activityId}`,
      activity
    );
    return response.data;
  }

  async getSegmentById(segmentId: number) {
    const api = await this.#axiosInstance;
    const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
    return response.data;
  }
}
