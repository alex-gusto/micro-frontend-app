import {
  PrecacheController,
  PrecacheRoute,
  type PrecacheEntry,
} from "workbox-precaching";
import { RegExpRoute, Router } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

const router = new Router();
router.addFetchListener();
const PcController = new PrecacheController();

declare const self: ServiceWorkerGlobalScope;

const generatedManifest = self.__WB_MANIFEST;

// TODO: collect enabled apps from shell config
const apps = ["board", "mf1", "core", "mf2", "shell", "libs"];

const fetchAppManifests = async () => {
  const manifests = await Promise.allSettled(
    apps
      .map((app) => fetch(`/${app}/manifest.json`))
      .map((req) => req.then((r) => r.json()))
  );

  return manifests
    .filter(
      (result): result is PromiseFulfilledResult<PrecacheEntry[]> =>
        result.status === "fulfilled"
    )
    .map((r) => r.value)
    .flat();
};

const init = () =>
  fetchAppManifests().then((manifests) => {
    // This method will add entries to the precache list
    PcController.addToCacheList([...generatedManifest, ...manifests]);

    // add a route to build files
    router.registerRoute(new PrecacheRoute(PcController));

    const THIRD_PART_CACHE = "third-party";

    // cache cdn js files
    const routesToCache = [
      new RegExpRoute(
        new RegExp("^https://cdnjs.cloudflare.com"),
        new CacheFirst({
          cacheName: THIRD_PART_CACHE,
          plugins: [
            new CacheableResponsePlugin({
              statuses: [0, 200],
            }),
          ],
        })
      ),
      new RegExpRoute(
        new RegExp("^https://fonts.googleapis.com"),
        new CacheFirst({
          cacheName: THIRD_PART_CACHE,
          plugins: [
            new CacheableResponsePlugin({
              statuses: [0, 200],
            }),
          ],
        })
      ),
    ];

    routesToCache.forEach((route) => {
      router.registerRoute(route);
    });
  });

// Install service worker: fetch manifests and pre-cache
self.addEventListener("install", (event) => {
  event.waitUntil(init().then(() => PcController.install(event)));
});

const bc = new BroadcastChannel("sw-updates");

// Activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    PcController.activate(event).then(async () => {
      const existingClients = await self.clients.matchAll({ type: "window" });

      // Force new service worker to controle all tabs
      await self.clients.claim();
      bc.postMessage({ type: "NEW_SW_ACTIVE" });
    })
  );
});

addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    return self.skipWaiting();
  }
});
