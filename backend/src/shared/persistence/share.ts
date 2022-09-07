import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { mapValues } from "lodash-es";
import short from "short-uuid";
import { config } from "../config.js";
import { firestore } from "./firestore.js";
import { Share } from "./types.js";
import lzString from "lz-string";

const { decompressFromBase64, compressToBase64 } = lzString;

const COLLECTION_NAME = "shares";
const collection = firestore.collection(COLLECTION_NAME).withConverter<Share>({
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const share = snap.data() as any;
    share.id = snap.id;

    switch (share.type) {
      case "strava-activity":
        return {
          ...share,
          streams: mapValues(share.streams, (stream) => {
            let streamString = stream.data;
            try {
              streamString = decompressFromBase64(streamString) ?? streamString;
            } catch {
              // noop
            }

            return { ...stream, data: JSON.parse(streamString) };
          }),
        };
      default:
        throw new Error(`'${share.type}' is not a valid share type`);
    }
  },
  toFirestore: (share: Share) => {
    switch (share.type) {
      case "strava-activity":
        return {
          ...share,
          streams: mapValues(share.streams, (stream) => ({
            ...stream,
            data: compressToBase64(JSON.stringify(stream!.data)),
          })),
        };
      default:
        throw new Error(`'${share.type}' is not a valid share type`);
    }
  },
});

export function getShareUrl(id: string) {
  return `${config.frontendUrl}/s/${id}`;
}

export async function writeShare(
  shareWithoutId: Omit<Share, "id">
): Promise<Share> {
  const snap = await collection
    .where("athlete.id", "==", shareWithoutId.athlete.id)
    .where("activity.id", "==", shareWithoutId.activity.id)
    .get();

  if (!snap.empty) {
    return snap.docs[0].data();
  }

  const id = short.generate();
  const share = { ...shareWithoutId, id };
  await collection.doc(id).set(share);
  return share;
}

export async function readShare(shareId: string): Promise<Share | undefined> {
  const snap = await collection.doc(shareId).get();
  return snap.data();
}

export async function removeShare(shareId: string): Promise<void> {
  await collection.doc(shareId).delete();
}
