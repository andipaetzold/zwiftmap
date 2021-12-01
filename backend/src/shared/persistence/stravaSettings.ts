import { Boolean, Record, Static } from "runtypes";
import { pool } from "./postgres";
import { redisClient } from "./redis";

export const StravaSettings = Record({
  addLinkToActivityDescription: Boolean,
});

export type StravaSettingsType = Static<typeof StravaSettings>;

interface DBRow {
  athlete_id: number;
  add_link_to_activity_description: boolean;
}
function createKey(athleteId: number): string {
  return `strava-settings:${athleteId}`;
}

export async function writeStravaSettings(
  athleteId: number,
  settings: StravaSettingsType
) {
  await pool.query<any, [number, boolean]>(
    `INSERT INTO strava_settings(athlete_id, add_link_to_activity_description)
     VALUES ($1, $2)
     ON CONFLICT (athlete_id) DO UPDATE
      SET add_link_to_activity_description = $2`,
    [athleteId, settings.addLinkToActivityDescription]
  );

  // TODO: remove after migration
  const key = createKey(athleteId);
  redisClient.del(key);
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaSettingsType> {
  const queryResult = await pool.query<DBRow>(
    "SELECT * FROM strava_settings WHERE athlete_id = $1 LIMIT 1",
    [athleteId]
  );

  if (queryResult.rowCount === 0) {
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

  const row = queryResult.rows[0];
  return {
    addLinkToActivityDescription: row.add_link_to_activity_description,
  };
}

export async function removeStravaSettings(athleteId: number): Promise<void> {
  await pool.query<any, [number]>(
    `DELETE FROM strava_settings WHERE athlete_id = $1`,
    [athleteId]
  );

  // TODO: remove after migration
  await redisClient.del(createKey(athleteId));
}
