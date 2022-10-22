import {
  CollectionReference,
  DocumentReference,
} from "@google-cloud/firestore";
import { getWorldFromActivity } from "../util.js";
import { WorldSlug } from "zwift-data";
import { DetailedActivity } from "../services/strava/index.js";
import {
  STRAVA_ACTIVITIES_COLLECTION_NAME,
  STRAVA_ATHLETES_COLLECTION_NAME,
} from "./constants.js";
import { firestore } from "./firestore.js";

export interface StravaActivity extends DetailedActivity {
  zwift: {
    world: WorldSlug;
  };
}

function getCollection(athleteId: number) {
  return firestore
    .collection(STRAVA_ATHLETES_COLLECTION_NAME)
    .doc(athleteId.toString())
    .collection(
      STRAVA_ACTIVITIES_COLLECTION_NAME
    ) as CollectionReference<StravaActivity>;
}

function getDoc(athleteId: number, activityId: number) {
  return getCollection(athleteId).doc(
    activityId.toString()
  ) as DocumentReference<StravaActivity>;
}

export async function writeStravaActivity(
  athleteId: number,
  activity: DetailedActivity
) {
  const world = getWorldFromActivity(activity)!;
  await getDoc(athleteId, activity.id).set({
    ...activity,
    zwift: {
      world: world.slug,
    },
  });
}

export async function readStravaActivity(
  athleteId: number,
  activityId: number
): Promise<StravaActivity | undefined> {
  const doc = getDoc(athleteId, activityId);
  const snap = await doc.get();
  return snap.data();
}

export async function readStravaActivities(
  athleteId: number
): Promise<StravaActivity[]> {
  const collection = getCollection(athleteId);
  const snap = await collection.get();
  return snap.docs.map((doc) => doc.data());
}

export async function readStravaActivitiesByWorld(
  athleteId: number,
  world: WorldSlug
): Promise<StravaActivity[]> {
  const query = getCollection(athleteId).where("zwift.world", "==", world);
  const snap = await query.get();
  return snap.docs.map((doc) => doc.data());
}

export async function removeStravaActivity(
  athleteId: number,
  activityId: number
) {
  const doc = getDoc(athleteId, activityId);
  await firestore.recursiveDelete(doc);
}
