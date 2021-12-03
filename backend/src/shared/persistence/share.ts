import short from "short-uuid";
import { FRONTEND_URL } from "../config";
import { pool } from "./pg";
import { Share, ShareDBRow, ShareStravaActivityDBRow } from "./types";

export function getShareUrl(id: string) {
  return `${FRONTEND_URL}/s/${id}`;
}

export async function writeShare(
  shareWithoutId: Omit<Share, "id">
): Promise<Share> {
  const result = await pool.query<ShareStravaActivityDBRow, [number, number]>(
    `SELECT * FROM "ShareStravaActivity"
          WHERE
            ("athlete" ->> 'id')::integer = $1 AND
            ("activity" ->> 'id')::bigint = $2
          LIMIT 1`,
    [shareWithoutId.athlete.id, shareWithoutId.activity.id]
  );

  if (result.rowCount === 0) {
    const id = short.generate();
    const share = { ...shareWithoutId, id };
    await pool.query<any, [string, string]>(
      'INSERT INTO "Share"("id", "type") VALUES($1, $2)',
      [share.id, "strava-activity"]
    );
    await pool.query<any, [string, any, any, any]>(
      'INSERT INTO "ShareStravaActivity"("id", "athlete", "activity", "streams") VALUES($1, $2, $3, $4)',
      [share.id, share.athlete, share.activity, share.streams as any]
    );
  }

  const row = result.rows[0];
  return {
    id: row.id,
    type: "strava-activity",
    athlete: row.athlete,
    activity: row.activity,
    streams: row.streams,
  };
}

export async function readShare(shareId: string): Promise<Share | undefined> {
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
  await pool.query<any, [string]>('DELETE FROM "Share" WHERE "id" = $1', [
    shareId,
  ]);
  await pool.query<any, [string]>(
    'DELETE FROM "ShareStravaActivity" WHERE "id" = $1',
    [shareId]
  );
}
