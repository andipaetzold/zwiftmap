import { default as axios } from "axios";
import { config } from "../../config.js";

export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com",
  params: {
    client_id: config.strava.clientId,
    client_secret: config.strava.clientSecret,
  },
});
