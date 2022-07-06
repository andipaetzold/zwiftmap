import { pool } from "./pg";
import { StravaSettingsDBRow, StravaSettingsType } from "./types";

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
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaSettingsType> {
  const result = await pool.query<StravaSettingsDBRow, [number]>(
    'SELECT * FROM "StravaSettings" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  if (result.rowCount === 0) {
    return {
      addLinkToActivityDescription: false,
    };
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
}
