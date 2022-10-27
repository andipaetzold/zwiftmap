import {
  createCachedFn,
  evictCacheWithPrefix,
  nodeCache,
} from "../cache/index.js";
import { DetailedActivity, SummaryActivity } from "./api-types/index.js";
import { StravaUserAPI } from "./api.js";

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

export class CachedStravaUserAPI {
  #api: StravaUserAPI;

  constructor(athleteId: number) {
    this.#api = new StravaUserAPI(athleteId);
  }

  getActivityById = createCachedFn(
    (activityId: number) => this.#api.getActivityById(activityId),
    (activityId) =>
      // strava:$athleteId:activities:$activityId
      [KEY, this.#api.athleteId, TYPE_ACTIVITY, activityId].join(":"),
    TTL
  );

  getActivityStreams = createCachedFn(
    (activityId: number) => this.#api.getActivityStreams(activityId),
    (activityId) =>
      // strava:$athleteId:activities:$activityId:streams
      [KEY, this.#api.athleteId, TYPE_ACTIVITY, activityId, KEY_STREAMS].join(
        ":"
      ),
    TTL
  );

  async getActivities(params: GetActivitiesParams): Promise<SummaryActivity[]> {
    return await this.#api.getActivities(params);
  }

  async updateActivity(
    activityId: number,
    activity: Partial<Pick<DetailedActivity, "description">>
  ): Promise<DetailedActivity> {
    return await this.#api.updateActivity(activityId, activity);
  }

  getSegmentById = createCachedFn(
    (segmentId: number) => this.#api.getSegmentById(segmentId),
    (segmentId) =>
      // strava:$athleteId:segments:$segmentId
      [KEY, this.#api.athleteId, TYPE_SEGMENT, segmentId].join(":"),
    TTL
  );

  static async evictCacheForAthlete(athleteId: number) {
    const prefix = [KEY, athleteId, ""].join(":");
    evictCacheWithPrefix(prefix);
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
