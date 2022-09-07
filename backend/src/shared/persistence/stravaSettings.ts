import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { identity } from "lodash-es";
import { firestore } from "./firestore.js";
import { StravaAthlete } from "./types.js";

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
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaAthlete> {
  const doc = collection.doc(athleteId.toString());
  const snap = await doc.get();

  if (snap.exists) {
    return snap.data()!;
  }

  return DEFAULT_STRAVA_ATHLETE;
}

export async function removeStravaSettings(athleteId: number) {
  await collection.doc(athleteId.toString()).delete();
}
