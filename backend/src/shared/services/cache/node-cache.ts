import NodeCache from "node-cache";

export const nodeCache = new NodeCache();

export function evictCacheWithPrefix(prefix: string) {
  const allKeys = nodeCache.keys();
  const keys = allKeys.filter((key) => key.startsWith(prefix));
  nodeCache.del(keys);
}
