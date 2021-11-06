import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../../shared/config";

export const stravaUserAPI = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com/api/v3",
  params: {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
  },
});
