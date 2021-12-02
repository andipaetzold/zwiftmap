import { pool } from "./pg";
import { redisClient } from "./redis";
import { StravaSettingsDBRow, StravaSettingsType } from "./types";

function createKey(athleteId: number): string {
  return `strava-settings:${athleteId}`;
}

export async function writeStravaSettings(
  athleteId: number,
  settings: StravaSettingsType
) {
  await pool.query<any, [number, boolean]>(
    `INSERT INTO
     "StravaSettings"("athleteId", "addLinkToActivityDescription")
     VALUES($1, $2)
     ON CONFLICT ("athleteId") DO UPDATE
     SET "addLinkToActivityDescription" = $2`,
    [athleteId, settings.addLinkToActivityDescription]
  );

  // TODO: remove after migration
  const key = createKey(athleteId);
  redisClient.del(key);
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaSettingsType> {
  const result = await pool.query<StravaSettingsDBRow, [number]>(
    'SELECT * FROM "StravaSettings" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  if (result.rowCount === 0) {
    // TODO: remove after migration
    const settings = await redisClient.get(createKey(athleteId));
    if (!settings) {
      return {
        addLinkToActivityDescription: false,
      };
    }
    await writeStravaSettings(athleteId, settings);
    return settings;
  }

  const row = result.rows[0];
  return {
    addLinkToActivityDescription: row.addLinkToActivityDescription,
  };
}

export async function removeStravaSettings(athleteId: number): Promise<void> {
  await pool.query('DELETE FROM "StravaSettings" WHERE "athleteId" = $1', [
    athleteId,
  ]);

  // TODO: remove after migration
  await redisClient.del(createKey(athleteId));
}
