import { default as axios } from "axios";
import { config } from "../../config.js";

// @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com",
  params: {
    client_id: config.strava.clientId,
    client_secret: config.strava.clientSecret,
  },
});
