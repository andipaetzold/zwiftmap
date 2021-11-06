import { read, remove, write } from "./redis";

export interface StravaToken {
  athleteId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

function createKey(athleteId: number): string {
  return `stravaToken:${athleteId}`;
}

export async function writeStravaToken(stravaToken: StravaToken) {
  const key = createKey(stravaToken.athleteId);
  await write(key, stravaToken);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  return await read(createKey(athleteId));
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  return await remove(createKey(athleteId));
}
