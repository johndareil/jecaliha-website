// Small in-memory TTL cache shared by the app's data functions.
// Best-effort only: a worker instance keeps it while it stays warm.

type CacheEntry = { value: unknown; expiresAt: number };

const store = new Map<string, CacheEntry>();

export function cacheGet<T>(key: string): T | null {
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    store.delete(key);
    return null;
  }
  return hit.value as T;
}

export function cacheSet(key: string, value: unknown, ttlMs: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}