// based on https://github.com/googleapis/nodejs-firestore-session/blob/main/src/index.ts

import { Firestore } from "@google-cloud/firestore";
import { SessionData, Store } from "express-session";

export interface FirestoreStoreOptions {
  dataset: Firestore;
  collection: string;
}

export class FirestoreStore extends Store {
  private readonly firestore: Firestore;
  private readonly collection: string;

  public constructor(options: FirestoreStoreOptions) {
    super();

    this.firestore = options.dataset;
    this.collection = options.collection;
  }

  async get(
    sessionId: string,
    callback: (err?: Error | null, session?: SessionData) => void
  ): Promise<void> {
    try {
      const doc = await this.firestore
        .collection(this.collection)
        .doc(sessionId)
        .get();

      if (!doc.exists) {
        callback();
        return;
      }

      try {
        const result = doc.data()! as SessionData;
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
      await this.firestore
        .collection(this.collection)
        .doc(sessionId)
        .set(
          // Firestore cannot serialize custom classes
          JSON.parse(JSON.stringify(session))
        );
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
      callback?.();
    } catch (e) {
      callback?.(e as Error);
    }
  }
}
