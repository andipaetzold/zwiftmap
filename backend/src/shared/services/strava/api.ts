import { AxiosInstance } from "axios";
import {
  DetailedActivity,
  DetailedSegment,
  StreamSet,
  SummaryActivity,
} from "strava";
import { createCachedFn, nodeCache } from "../cache/index.js";
import { getStravaUserAPI } from "./userApi.js";

/**
 * One hour
 */
const TTL = 60 * 60;

const KEY = "strava-cache";
const TYPE_ACTIVITY = "activity";
const TYPE_SEGMENT = "segment";
const KEY_STREAMS = "streams";

interface GetActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export class StravaUserAPI {
  #athleteId: number;
  #axiosInstance: Promise<AxiosInstance>;

  constructor(athleteId: number) {
    this.#athleteId = athleteId;
    this.#axiosInstance = getStravaUserAPI(athleteId);
  }

  getActivityById = createCachedFn(
    async (activityId: number) => {
      const api = await this.#axiosInstance;
      const response = await api.get<DetailedActivity>(
        `/activities/${activityId}`
      );
      return response.data;
    },
    (activityId) =>
      // strava:$athleteId:activities:$activityId
      [KEY, this.#athleteId, TYPE_ACTIVITY, activityId].join(":"),
    TTL
  );

  getActivityStreams = createCachedFn(
    async (activityId: number) => {
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
    },
    (activityId) =>
      // strava:$athleteId:activities:$activityId:streams
      [KEY, this.#athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(":"),
    TTL
  );

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

  getSegmentById = createCachedFn(
    async (segmentId: number) => {
      const api = await this.#axiosInstance;
      const response = await api.get<DetailedSegment>(`/segments/${segmentId}`);
      return response.data;
    },
    (segmentId) =>
      // strava:$athleteId:segments:$segmentId
      [KEY, this.#athleteId, TYPE_SEGMENT, segmentId].join(":"),
    TTL
  );

  static async evictCacheForAthlete(athleteId: number) {
    const allKeys = nodeCache.keys();
    const pattern = [KEY, athleteId, ""].join(":");
    const keys = allKeys.filter((key) => key.startsWith(pattern));
    nodeCache.del(keys);
  }

  static async evictCacheForActivity(athleteId: number, activityId: number) {
    const key = [KEY, athleteId, TYPE_ACTIVITY, activityId].join(":");
    nodeCache.del(key);

    const streamsKey = [
      KEY,
      athleteId,
      TYPE_ACTIVITY,
      activityId,
      "streams",
    ].join(":");
    nodeCache.del(streamsKey);
  }
}
