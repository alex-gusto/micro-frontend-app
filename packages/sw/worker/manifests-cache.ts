import type { PrecacheEntry } from "workbox-precaching";

const CACHE_PREFIX = "mf-manifests:";
// TODO: collect enabled apps from shell config
const apps = ["libs", "shell", "core", "board", "mf1", "mf2"];

function getCacheName(ver: string) {
  return `${CACHE_PREFIX}${ver}`;
}

function deleteStaleManifestsCache(cacheName: string) {
  return caches.keys().then((keys) => {
    return Promise.all(
      keys.map((key) => {
        if (key.startsWith(CACHE_PREFIX) && key !== cacheName) {
          return caches.delete(key);
        }
      })
    );
  });
}

const fetchAndCacheManifests = async (cacheName: string) => {
  const cache = await caches.open(cacheName);

  const manifests = await Promise.allSettled(
    apps.map(async (app) => {
      const url = `/${app}/manifest.json`;

      const result = await cache.match(url);

      const resp = result ? result : await fetch(url);

      if (!resp.ok) throw new Error("No manifest is found for: " + app);

      if (!result) await cache.put(url, resp.clone());

      return resp.json();
    })
  );

  return manifests
    .filter(
      (result): result is PromiseFulfilledResult<PrecacheEntry[]> =>
        result.status === "fulfilled"
    )
    .flatMap((r) => r.value);
};

export const manifestsCache = (version: string) => {
  const cacheName = getCacheName(version);

  return {
    get: () => fetchAndCacheManifests(cacheName),
    clear: () => deleteStaleManifestsCache(cacheName),
  };
};
