// based on https://github.com/googleapis/nodejs-firestore-session/blob/main/src/index.ts

import { Firestore } from "@google-cloud/firestore";
import { SessionData, Store } from "express-session";

export interface FirestoreStoreOptions {
  firestore: Firestore;
  collection: string;
}

export class FirestoreStore extends Store {
  readonly #firestore: Firestore;
  readonly #collection: string;

  constructor(options: FirestoreStoreOptions) {
    super();

    this.#firestore = options.firestore;
    this.#collection = options.collection;
  }

  async get(
    sessionId: string,
    callback: (err?: Error | null, session?: SessionData | null) => void
  ): Promise<void> {
    try {
      const doc = await this.#firestore
        .collection(this.#collection)
        .doc(sessionId)
        .get();

      if (!doc.exists) {
        callback();
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
      const expireAt = session.cookie?.expires ?? null;
      const data = {
        data: JSON.stringify(session),
        expireAt: expireAt ? new Date(expireAt) : null,
      };

      await this.#firestore
        .collection(this.#collection)
        .doc(sessionId)
        .set(data);
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
      await this.#firestore
        .collection(this.#collection)
        .doc(sessionId)
        .delete();
      callback?.();
    } catch (e) {
      callback?.(e as Error);
    }
  }
}
