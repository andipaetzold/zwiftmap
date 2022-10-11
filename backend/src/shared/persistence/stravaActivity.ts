import { DocumentReference } from "@google-cloud/firestore";
import { DetailedActivity } from "strava";
import {
  STRAVA_ACTIVITIES_COLLECTION_NAME,
  STRAVA_ATHLETES_COLLECTION_NAME,
} from "./constants.js";
import { firestore } from "./firestore.js";

function getDoc(athleteId: number, activityId: number) {
  return firestore
    .collection(STRAVA_ATHLETES_COLLECTION_NAME)
    .doc(athleteId.toString())
    .collection(STRAVA_ACTIVITIES_COLLECTION_NAME)
    .doc(activityId.toString()) as DocumentReference<DetailedActivity>;
}

export async function writeStravaActivity(
  athleteId: number,
  activity: DetailedActivity
) {
  await getDoc(athleteId, activity.id).set(activity);
}

export async function readStravaActivity(
  athleteId: number,
  activityId: number
): Promise<DetailedActivity | undefined> {
  const doc = getDoc(athleteId, activityId);
  const snap = await doc.get();
  return snap.data();
}

export async function removeStravaActivity(
  athleteId: number,
  activityId: number
) {
  const doc = getDoc(athleteId, activityId);
  await firestore.recursiveDelete(doc);
}
