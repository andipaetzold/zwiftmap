import axios, { AxiosInstance } from "axios";
import { config } from "../../config.js";
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "./api-types/index.js";

export class StravaAppAPI {
  #axiosInstance: AxiosInstance;

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: "https://www.strava.com",
      params: {
        client_id: config.strava.clientId,
        client_secret: config.strava.clientSecret,
      },
    });
  }

  async authorize(code: string) {
    return await this.#axiosInstance.post("/oauth/token", {
      code,
      grant_type: "authorization_code",
    });
  }

  async refreshToken(token: string) {
    return await this.#axiosInstance.post<RefreshTokenResponse>(
      "/oauth/token",
      {
        grant_type: "refresh_token",
        refresh_token: token,
      } as Partial<RefreshTokenRequest>
    );
  }
}
