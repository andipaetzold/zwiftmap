import { pool } from "./pg";
import { StravaToken } from "./types";

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
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  const result = await pool.query<StravaToken, [number]>(
    'SELECT * FROM "StravaToken" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  return result.rows[0];
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  await pool.query('DELETE FROM "StravaToken" WHERE "athleteId" = $1', [
    athleteId,
  ]);
}
