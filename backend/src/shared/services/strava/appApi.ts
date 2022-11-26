import axios, { AxiosInstance } from "axios";
import { config } from "../../config.js";
import {
  AuthorizeCodeRequest,
  AuthorizeCodeResponse,
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
    const data: Partial<AuthorizeCodeRequest> = {
      grant_type: "authorization_code",
      code,
    };
    return await this.#axiosInstance.post<AuthorizeCodeResponse>(
      "/oauth/token",
      data
    );
  }

  async refreshToken(token: string) {
    const data: Partial<RefreshTokenRequest> = {
      grant_type: "refresh_token",
      refresh_token: token,
    };
    return await this.#axiosInstance.post<RefreshTokenResponse>(
      "/oauth/token",
      data
    );
  }
}
