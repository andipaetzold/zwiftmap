import axios, { AxiosInstance } from "axios";
import {
  readStravaToken,
  removeStravaToken,
  StravaToken,
  writeStravaToken,
} from "../../persistence/index.js";
import {
  DetailedActivity,
  DetailedSegment,
  StravaAppAPI,
  StreamSet,
  SummaryActivity,
} from "./index.js";

interface GetActivitiesParams {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
}

export class StravaUserAPI {
  #appApi = new StravaAppAPI();
  #axiosInstance: Promise<AxiosInstance>;

  constructor(readonly athleteId: number) {
    this.#axiosInstance = this.#createAxiosInstance(athleteId);
  }

  async #createAxiosInstance(athleteId: number): Promise<AxiosInstance> {
    const token = await this.#getToken(athleteId);

    return axios.create({
      baseURL: "https://www.strava.com/api/v3",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async #getToken(athleteId: number): Promise<string> {
    let stravaToken = await readStravaToken(athleteId);
    if (!stravaToken) {
      throw new Error("Strava token not found");
    }

    if (stravaToken.expiresAt < Date.now() / 1_000 - 60) {
      stravaToken = await this.#refreshToken(stravaToken);
    }

    return stravaToken.token;
  }

  async #refreshToken(stravaToken: StravaToken): Promise<StravaToken> {
    try {
      const response = await this.#appApi.refreshToken(
        stravaToken.refreshToken
      );

      const refreshedStravaToken: StravaToken = {
        athleteId: stravaToken.athleteId,
        expiresAt: response.data.expires_at,
        refreshToken: response.data.refresh_token,
        token: response.data.access_token,
        scope: stravaToken.scope,
      };

      await writeStravaToken(refreshedStravaToken);

      return refreshedStravaToken;
    } catch {
      await removeStravaToken(stravaToken.athleteId);
      throw new Error("Strava token not found");
    }
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
