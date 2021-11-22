import { createClient } from "redis";
import { REDIS_URL } from "../config";

export const redisClient = createClient({
  url: REDIS_URL,
});

export async function write<T = any>(key: string, value: T): Promise<void> {
  const stringified = JSON.stringify(value);

  await new Promise<void>((resolve, reject) => {
    redisClient.set(key, stringified, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function read<T = any>(key: string): Promise<T | undefined> {
  return await new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value ? JSON.parse(value) : undefined);
      }
    });
  });
}

export async function remove(key: string): Promise<void> {
  return await new Promise((resolve, reject) => {
    redisClient.del(key, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function exists(key: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    redisClient.exists(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply === 1);
      }
    });
  });
}

export async function hset<T = any>(
  key: string,
  field: string,
  value: T
): Promise<void> {
  const stringified = JSON.stringify(value);

  await new Promise<void>((resolve, reject) => {
    redisClient.hset(key, field, stringified, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function hget<T = any>(
  key: string,
  field: string
): Promise<T | undefined> {
  return await new Promise((resolve, reject) => {
    redisClient.hget(key, field, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value ? JSON.parse(value) : undefined);
      }
    });
  });
}
