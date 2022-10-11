import { STRAVA_TOKENS_COLLECTION_NAME } from "./constants.js";
import { firestore } from "./firestore.js";
import { StravaToken } from "./types.js";

const collection = firestore.collection(STRAVA_TOKENS_COLLECTION_NAME);

export async function writeStravaToken(stravaToken: StravaToken) {
  await collection.doc(stravaToken.athleteId.toString()).set(stravaToken);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  const doc = collection.doc(athleteId.toString());
  const snap = await doc.get();

  return snap.data() as StravaToken | undefined;
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  await collection.doc(athleteId.toString()).delete();
}
