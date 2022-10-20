import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { identity } from "lodash-es";
import { STRAVA_ATHLETES_COLLECTION_NAME } from "./constants.js";
import { firestore } from "./firestore.js";
import { StravaAthlete } from "./types.js";

const DEFAULT_STRAVA_ATHLETE = Object.freeze<StravaAthlete>({
  addLinkToActivityDescription: false,
  persistActivities: false,
});

const collection = firestore
  .collection(STRAVA_ATHLETES_COLLECTION_NAME)
  .withConverter<StravaAthlete>({
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      const data = snap.data() as Partial<StravaAthlete>;
      return {
        addLinkToActivityDescription:
          data.addLinkToActivityDescription ??
          DEFAULT_STRAVA_ATHLETE.addLinkToActivityDescription,
        persistActivities:
          data.persistActivities ?? DEFAULT_STRAVA_ATHLETE.persistActivities,
      };
    },
    toFirestore: identity,
  });

export async function writeStravaAthlete(
  athleteId: number,
  settings: StravaAthlete
) {
  await collection.doc(athleteId.toString()).set(settings);
}

export async function readStravaAthlete(
  athleteId: number
): Promise<StravaAthlete> {
  const doc = collection.doc(athleteId.toString());
  const snap = await doc.get();

  if (snap.exists) {
    return snap.data()!;
  }

  return DEFAULT_STRAVA_ATHLETE;
}

export async function removeStravaAthlete(athleteId: number) {
  const doc = collection.doc(athleteId.toString());
  await firestore.recursiveDelete(doc);
}
