import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { identity } from "lodash";
import { firestore } from "./firestore";
import { pool } from "./pg";
import { StravaSettingsDBRow, StravaAthlete } from "./types";

const DEFAULT_STRAVA_ATHLETE = Object.freeze<StravaAthlete>({
  addLinkToActivityDescription: false,
});

const COLLECTION_NAME = "strava-athletes";
const collection = firestore
  .collection(COLLECTION_NAME)
  .withConverter<StravaAthlete>({
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      const data = snap.data() as Partial<StravaAthlete>;
      return {
        addLinkToActivityDescription:
          data.addLinkToActivityDescription ??
          DEFAULT_STRAVA_ATHLETE.addLinkToActivityDescription,
      };
    },
    toFirestore: identity,
  });

export async function writeStravaSettings(
  athleteId: number,
  settings: StravaAthlete
) {
  await collection.doc(athleteId.toString()).set(settings);

  // TODO: remove once migrated
  await removeStravaSettingsPg(athleteId);
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaAthlete> {
  const doc = collection.doc(athleteId.toString());
  const snap = await doc.get();
  if (snap.exists) {
    return snap.data()!;
  }

  // TODO: remove once migrated
  const result = await pool.query<StravaSettingsDBRow, [number]>(
    'SELECT * FROM "StravaSettings" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  if (result.rowCount === 0) {
    return DEFAULT_STRAVA_ATHLETE;
  }

  const row = result.rows[0];
  const settings = {
    addLinkToActivityDescription: row.addLinkToActivityDescription,
  };
  await doc.set(settings);
  await removeStravaSettingsPg(athleteId);
  return settings;
}

export async function removeStravaSettings(athleteId: number) {
  await collection.doc(athleteId.toString()).delete();
  await removeStravaSettingsPg(athleteId);
}

/**
 * @deprecated remove once migrated
 */
async function removeStravaSettingsPg(athleteId: number): Promise<void> {
  await pool.query('DELETE FROM "StravaSettings" WHERE "athleteId" = $1', [
    athleteId,
  ]);
}

export async function getAllStravaSettingsAthleteIds(): Promise<number[]> {
  const result = await pool.query<{ athleteId: number }>(
    'SELECT "athleteId" FROM "StravaSettings"'
  );

  return result.rows.map((row) => row.athleteId);
}
