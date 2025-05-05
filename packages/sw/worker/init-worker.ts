import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { PrecacheController, PrecacheRoute } from "workbox-precaching";
import { RegExpRoute, Router } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { manifestsCache } from "./manifests-cache";
import { createWorker, type WorkerManager } from "./create-worker";

declare const self: ServiceWorkerGlobalScope;

const generatedManifest = self.__WB_MANIFEST;

const THIRD_PART_CACHE = "third-party";
const thirdPartURLs = [
  "https://cdnjs.cloudflare.com",
  "https://fonts.googleapis.com",
];

let router: Router | undefined;
let pcController: PrecacheController | undefined;

function assertRouter(router: Router | undefined): asserts router {
  if (!router) throw new Error("Router is not defined!");
}

function assertPcController(
  ctrl: PrecacheController | undefined
): asserts ctrl {
  if (!ctrl) throw new Error("PrecacheController is not defined!");
}

export const initWorker = (
  version: string
): WorkerManager | Promise<WorkerManager> => {
  if (router && pcController) {
    return createWorker(version, router, pcController);
  }

  router = new Router();
  pcController = new PrecacheController();

  return manifestsCache(version)
    .get()
    .then((manifests) => {
      assertRouter(router);
      assertPcController(pcController);

      router.registerRoute(new PrecacheRoute(pcController));
      // This method will add entries to the precache list
      pcController.addToCacheList([...generatedManifest, ...manifests]);

      router.registerRoute(
        new RegExpRoute(
          new RegExp(thirdPartURLs.join("|")),
          new StaleWhileRevalidate({
            cacheName: THIRD_PART_CACHE,
            plugins: [
              new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
            ],
          })
        )
      );

      return createWorker(version, router, pcController);
    });
};
