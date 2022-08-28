import { firestore } from "./firestore";
import { pool } from "./pg";
import { StravaToken } from "./types";

const COLLECTION_NAME = "strava-tokens";
const collection = firestore.collection(COLLECTION_NAME);

export async function writeStravaToken(stravaToken: StravaToken) {
  await collection.doc(stravaToken.athleteId.toString()).set(stravaToken);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  const doc = collection.doc(athleteId.toString());
  const snap = await doc.get();

  if (snap.exists) {
    return snap.data()! as StravaToken;
  }

  return await readStravaTokenPg(athleteId);
}

/**
 * @deprecated Remove once migration is done
 */
async function readStravaTokenPg(
  athleteId: number
): Promise<StravaToken | undefined> {
  const result = await pool.query<StravaToken, [number]>(
    'SELECT * FROM "StravaToken" WHERE "athleteId" = $1 LIMIT 1',
    [athleteId]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  const stravaToken = result.rows[0];
  await writeStravaToken(stravaToken);
  await removeStravaTokenPg(athleteId);
  return stravaToken;
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  await collection.doc(athleteId.toString()).delete();
  await removeStravaTokenPg(athleteId);
}

/**
 * @deprecated Remove once migration is done
 */
async function removeStravaTokenPg(athleteId: number): Promise<void> {
  await pool.query('DELETE FROM "StravaToken" WHERE "athleteId" = $1', [
    athleteId,
  ]);
}

export async function getAllStravaTokenIds(): Promise<number[]> {
  const result = await pool.query<{ athleteId: number }>(
    'SELECT "athleteId" FROM "StravaToken"'
  );
  return result.rows.map(row => row.athleteId);
}
