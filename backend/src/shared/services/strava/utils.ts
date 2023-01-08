import { config } from "../../config.js";

export function isStravaBetaUser(stravaAthleteId: number): boolean {
  return config.strava.betaUsers.includes(stravaAthleteId);
}

export function isStravaAdminUser(stravaAthleteId: number): boolean {
  return config.strava.adminUsers.includes(stravaAthleteId);
}

export function isStravaModeratorUser(stravaAthleteId: number): boolean {
  return config.strava.moderatorUsers.includes(stravaAthleteId);
}
