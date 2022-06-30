import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { mapValues } from "lodash";
import short from "short-uuid";
import { FRONTEND_URL } from "../config";
import { firestore } from "./firestore";
import { pool } from "./pg";
import { Share, ShareDBRow, ShareStravaActivityDBRow } from "./types";

const COLLECTION_NAME = "shares";
const collection = firestore.collection(COLLECTION_NAME).withConverter<Share>({
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const share = snap.data() as any;
    share.id = snap.id;

    switch (share.type) {
      case "strava-activity":
        return {
          ...share,
          streams: mapValues(share.streams, (stream) => ({
            ...stream,
            data: JSON.parse(stream.data),
          })),
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
            data: JSON.stringify(stream!.data),
          })),
        };
      default:
        throw new Error(`'${share.type}' is not a valid share type`);
    }
  },
});

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

export async function writeShare(
  shareWithoutId: Omit<Share, "id">
): Promise<Share> {
  const result = await pool.query<ShareStravaActivityDBRow, [number, number]>(
    `SELECT * FROM "ShareStravaActivity"
          WHERE
            ("athlete" ->> 'id')::bigint = $1 AND
            ("activity" ->> 'id')::bigint = $2
          LIMIT 1`,
    [shareWithoutId.athlete.id, shareWithoutId.activity.id]
  );

  if (result.rowCount === 0) {
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
  } else {
    const row = result.rows[0];
    const share: Share = {
      id: row.id,
      type: "strava-activity",
      athlete: row.athlete,
      activity: row.activity,
      streams: row.streams,
    };

    await collection.doc(share.id).set(share);
    await removeShareFromPG(share.id);
    return share;
  }
}

export async function readShare(shareId: string): Promise<Share | undefined> {
  const snap = await collection.doc(shareId).get();
  if (snap.exists) {
    return snap.data()!;
  } else {
    const share = await readShareFromPG(shareId);
    if (!share) {
      return undefined;
    }

    await collection.doc(share.id).set(share);
    await removeShareFromPG(shareId);
    return share;
  }
}

/**
 * @deprecated
 */
async function readShareFromPG(shareId: string): Promise<Share | undefined> {
  const shareResult = await pool.query<ShareDBRow, [string]>(
    'SELECT * FROM "Share" WHERE "id" = $1',
    [shareId]
  );

  if (shareResult.rowCount === 0) {
    return undefined;
  }

  switch (shareResult.rows[0].type) {
    case "strava-activity": {
      const shareStravaActivityResult = await pool.query<
        ShareStravaActivityDBRow,
        [string]
      >('SELECT * FROM "ShareStravaActivity" WHERE "id" = $1', [shareId]);
      if (shareStravaActivityResult.rowCount === 0) {
        return undefined;
      }

      const row = shareStravaActivityResult.rows[0];

      return {
        id: row.id,
        type: "strava-activity",
        athlete: row.athlete,
        activity: row.activity,
        streams: row.streams,
      };
    }
  }
}

export async function removeShare(shareId: string): Promise<void> {
  await collection.doc(shareId).delete();
  await removeShareFromPG(shareId);
}

/**
 * @deprecated
 */
async function removeShareFromPG(shareId: string): Promise<void> {
  await pool.query<any, [string]>('DELETE FROM "Share" WHERE "id" = $1', [
    shareId,
  ]);
  await pool.query<any, [string]>(
    'DELETE FROM "ShareStravaActivity" WHERE "id" = $1',
    [shareId]
  );
}
