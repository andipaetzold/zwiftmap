import { redisClient } from "./redis";

export interface StravaToken {
  athleteId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
  scope: string[];
}

function createKey(athleteId: number): string {
  return `stravaToken:${athleteId}`;
}

export async function writeStravaToken(stravaToken: StravaToken) {
  const key = createKey(stravaToken.athleteId);
  await redisClient.set(key, stravaToken);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  return await redisClient.get(createKey(athleteId));
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  return await redisClient.del(createKey(athleteId));
}
