import { pool } from "./pg";
import { redisClient } from "./redis";
import { StravaToken } from "./types";

function createKey(athleteId: number): string {
  return `stravaToken:${athleteId}`;
}

export async function writeStravaToken(stravaToken: StravaToken) {
  await pool.query<
    any,
    [number, string, string, number, undefined | null | string[]]
  >(
    `INSERT INTO
     "StravaToken"("athleteId", "token", "refreshToken", "expiresAt", "scope")
     VALUES($1, $2, $3, $4, $5)
     ON CONFLICT ("athleteId") DO UPDATE
     SET "token" = $2, "refreshToken" = $3, "expiresAt" = $4, "scope" = $5`,
    [
      stravaToken.athleteId,
      stravaToken.token,
      stravaToken.refreshToken,
      stravaToken.expiresAt,
      stravaToken.scope,
    ]
  );

  // TODO: remove after migration
  const key = createKey(stravaToken.athleteId);
  await redisClient.del(key);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  const result = await pool.query<StravaToken, [number]>(
    'SELECT * FROM "StravaToken" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  if (result.rowCount === 0) {
    const token = await redisClient.get<StravaToken>(createKey(athleteId));
    if (token) {
      await writeStravaToken(token);
    }
    return token;
  }

  const row = result.rows[0];
  return row;
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  await pool.query('DELETE FROM "StravaToken" WHERE "athleteId" = $1', [
    athleteId,
  ]);

  // TODO: remove after migration
  await redisClient.del(createKey(athleteId));
}
