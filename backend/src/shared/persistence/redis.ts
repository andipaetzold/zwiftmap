import { createClient } from "redis";
import { REDIS_URL } from "../config";

export const redisCallbackClient = createClient({
  url: REDIS_URL,
});

export const redisClient = {
  del,
  exists,
  get,
  keys,
  set,
  setex,
  ttl,
};

async function set<T = any>(key: string, value: T): Promise<void> {
  const stringified = JSON.stringify(value);

  await new Promise<void>((resolve, reject) => {
    redisCallbackClient.set(key, stringified, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function setex<T = any>(
  key: string,
  value: T,
  expirationTime: number
): Promise<void> {
  const stringified = JSON.stringify(value);

  await new Promise<void>((resolve, reject) => {
    redisCallbackClient.setex(key, expirationTime, stringified, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function get<T = any>(key: string): Promise<T | undefined> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value ? JSON.parse(value) : undefined);
      }
    });
  });
}

async function ttl(key: string): Promise<number | undefined> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.ttl(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

async function del(key: string): Promise<void> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.del(key, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function keys(pattern: string): Promise<string[]> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.keys(pattern, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

async function exists(key: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.exists(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply === 1);
      }
    });
  });
}
