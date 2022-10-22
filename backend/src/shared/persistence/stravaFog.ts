import {
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { Feature, MultiPolygon, Polygon } from "geojson";
import { WorldSlug } from "zwift-data";
import {
  STRAVA_ATHLETES_COLLECTION_NAME,
  STRAVA_FOG_COLLECTION_NAME,
} from "./constants.js";
import { firestore } from "./firestore.js";
import lzString from "lz-string";

const { decompressFromBase64, compressToBase64 } = lzString;

export interface StravaFogStats {
  activityDistance: number;
  activityCount: number;
  unlockedDistance: number;
}

export interface StravaFog {
  stats?: StravaFogStats;
  geoJSON?: Feature<Polygon | MultiPolygon>;
}

interface FirestoreStravaFog {
  stats?: StravaFogStats;
  geoJSON?: string;
}

function getCollection(athleteId: number) {
  return firestore
    .collection(STRAVA_ATHLETES_COLLECTION_NAME)
    .doc(athleteId.toString())
    .collection(STRAVA_FOG_COLLECTION_NAME) as CollectionReference<StravaFog>;
}

function getDoc(athleteId: number, world: WorldSlug) {
  return getCollection(athleteId)
    .doc(world)
    .withConverter<StravaFog>({
      fromFirestore: (snap: QueryDocumentSnapshot<FirestoreStravaFog>) => {
        const data = snap.data();
        if (!data) {
          return {};
        }
        return {
          stats: data.stats,
          geoJSON: data.geoJSON
            ? JSON.parse(decompressFromBase64(data.geoJSON)!)
            : undefined,
        };
      },
      toFirestore: (input: unknown) => {
        const fog = input as Partial<StravaFog>; // we don't use field values
        let result: Partial<FirestoreStravaFog> = {};

        if ("stats" in fog) {
          result.stats = fog.stats;
        }

        if ("geoJSON" in fog) {
          result.geoJSON = compressToBase64(JSON.stringify(fog.geoJSON));
        }

        return result;
      },
    }) as DocumentReference<StravaFog>;
}

export async function writeStravaFogStats(
  athleteId: number,
  world: WorldSlug,
  stats: StravaFogStats
) {
  await getDoc(athleteId, world).set(
    { stats },
    {
      mergeFields: ["stats"],
    }
  );
}

export async function writeStravaFogGeoJSON(
  athleteId: number,
  world: WorldSlug,
  geoJSON: Feature<Polygon | MultiPolygon>
) {
  await getDoc(athleteId, world).set(
    { geoJSON },
    {
      mergeFields: ["geoJSON"],
    }
  );
}

export async function readStravaFog(
  athleteId: number,
  world: WorldSlug
): Promise<StravaFog | undefined> {
  const doc = getDoc(athleteId, world);
  const snap = await doc.get();
  return snap.data();
}

export async function removeStravaFog(athleteId: number, world: WorldSlug) {
  const doc = getDoc(athleteId, world);
  await doc.delete();
}

export async function removeStravaFogs(athleteId: number) {
  const collection = getCollection(athleteId);
  const docs = await collection.listDocuments();
  for (const doc of docs) {
    await doc.delete();
  }
}
