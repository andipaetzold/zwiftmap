// based on https://github.com/googleapis/nodejs-firestore-session/blob/main/src/index.ts

import { Firestore } from "@google-cloud/firestore";
import { SessionData, Store } from "express-session";

export interface FirestoreStoreOptions {
  firestore: Firestore;
  collection: string;
  /**
   * remove once migration is done
   */
  redisStore: Store;
}

export class FirestoreStore extends Store {
  private readonly firestore: Firestore;
  private readonly collection: string;
  private readonly redisStore: Store;

  public constructor(options: FirestoreStoreOptions) {
    super();

    this.firestore = options.firestore;
    this.collection = options.collection;
    this.redisStore = options.redisStore;
  }

  async get(
    sessionId: string,
    callback: (err?: Error | null, session?: SessionData | null) => void
  ): Promise<void> {
    try {
      const doc = await this.firestore
        .collection(this.collection)
        .doc(sessionId)
        .get();

      if (!doc.exists) {
        this.redisStore.get(sessionId, (err, session) => {
          if (err) {
            // error
            callback(err);
          } else if (session) {
            // move session to firestore
            this.set(sessionId, session)
            this.redisStore.destroy(sessionId)
            callback(null, session)
          } else {
            // not found
            callback()
          }
        });
        return;
      }

      try {
        const result = JSON.parse(doc.data()!.data) as SessionData;
        callback(null, result);
      } catch (err) {
        callback(err as Error);
      }
    } catch (e) {
      callback(e as Error);
    }
  }

  async set(
    sessionId: string,
    session: SessionData,
    callback?: (err?: Error) => void
  ): Promise<void> {
    try {
      const data = {
        data: JSON.stringify(session),
        expireAt: session.cookie?.expires ?? null,
      };

      await this.firestore.collection(this.collection).doc(sessionId).set(data);
      this.redisStore.destroy(sessionId);
      callback?.();
    } catch (e) {
      callback?.(e as Error);
    }
  }

  async destroy(
    sessionId: string,
    callback?: (err?: Error) => void
  ): Promise<void> {
    try {
      await this.firestore.collection(this.collection).doc(sessionId).delete();
      this.redisStore.destroy(sessionId);
      callback?.();
    } catch (e) {
      callback?.(e as Error);
    }
  }
}
