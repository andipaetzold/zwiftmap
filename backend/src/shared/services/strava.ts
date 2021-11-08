import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "../config";

export const stravaAppAPI = axios.create({
  baseURL: "https://www.strava.com",
  params: {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
  },
});
