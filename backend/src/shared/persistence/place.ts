import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { omit } from "lodash-es";
import { WorldSlug } from "zwift-data";
import { LatLng } from "../types.js";
import { PLACES_COLLECTION_NAME, WORLDS_COLLECTION_NAME } from "./constants.js";
import { firestore } from "./firestore.js";

export interface Place {
  id: string;
  world: WorldSlug;
  name: string;
  description: string;
  links: string[];
  position: LatLng;
  verified: boolean;
}

interface FirestorePlace {
  name: string;
  description: string;
  links: string[];
  position: LatLng;
  verified: boolean;
}

const converter: FirestoreDataConverter<Place> = {
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as FirestorePlace;
    return {
      id: snap.id,
      world: snap.ref.parent.parent!.id as WorldSlug,
      name: data.name,
      description: data.description,
      links: data.links,
      position: data.position,
      verified: data.verified,
    };
  },
  toFirestore: (place: Place) => omit(place, ["id", "world"]),
};

function getCollection(world: WorldSlug) {
  return firestore
    .collection(WORLDS_COLLECTION_NAME)
    .doc(world)
    .collection(PLACES_COLLECTION_NAME)
    .withConverter(converter);
}

function getDoc(world: WorldSlug, placeId: string) {
  return getCollection(world).doc(placeId);
}

export async function createPlace(place: Omit<Place, "id">) {
  await getCollection(place.world).add({
    id: "new", // will be overwritten
    ...place,
  });
}

export async function writePlace(place: Place) {
  await getDoc(place.world, place.id).set(place);
}

export async function readPlace(
  world: WorldSlug,
  placeId: string
): Promise<Place | undefined> {
  const snap = await getDoc(world, placeId).get();
  return snap.data();
}

export async function readPlaces(): Promise<Place[]> {
  const snap = await firestore
    .collectionGroup(PLACES_COLLECTION_NAME)
    .withConverter(converter)
    .get();
  return snap.docs.map((doc) => doc.data());
}

export async function readPlacesByWorld(world: WorldSlug): Promise<Place[]> {
  const snap = await getCollection(world).get();
  return snap.docs.map((doc) => doc.data());
}

export async function removePlace(
  world: WorldSlug,
  placeId: string
): Promise<void> {
  await getDoc(world, placeId).delete();
}
