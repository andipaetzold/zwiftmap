import { createClient } from "redis";
import { REDIS_URL } from "../config";

export const redisCallbackClient = createClient({
  url: REDIS_URL,
});

export const redisClient = {
  set,
  get,
  del,
  exists,
  hset,
  hget,
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

async function hset<T = any>(
  key: string,
  field: string,
  value: T
): Promise<void> {
  const stringified = JSON.stringify(value);

  await new Promise<void>((resolve, reject) => {
    redisCallbackClient.hset(key, field, stringified, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function hget<T = any>(
  key: string,
  field: string
): Promise<T | undefined> {
  return await new Promise((resolve, reject) => {
    redisCallbackClient.hget(key, field, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value ? JSON.parse(value) : undefined);
      }
    });
  });
}
