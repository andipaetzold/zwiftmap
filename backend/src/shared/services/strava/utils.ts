import { config } from "../../config.js";

export function isStravaBetaUser(stravaAthleteId: number): boolean {
  return config.strava.betaUsers.includes(stravaAthleteId);
}

export function isAdminUser(stravaAthleteId: number): boolean {
  return config.strava.adminUsers.includes(stravaAthleteId);
}
