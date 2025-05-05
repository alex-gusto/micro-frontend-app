import type { PrecacheController } from "workbox-precaching";
import type { Router } from "workbox-routing";
import { manifestsCache } from "./manifests-cache";

export interface WorkerManager {
  install: PrecacheController["install"];
  activate: PrecacheController["activate"];
  handleRequest: Router["handleRequest"];
}

export function createWorker(
  version: string,
  router: Router,
  pcController: PrecacheController
) {
  return {
    install(event: ExtendableEvent) {
      return pcController.install(event);
    },
    activate(event: ExtendableEvent) {
      return pcController.activate(event).then((cleanup) => {
        return manifestsCache(version)
          .clear()
          .then(() => cleanup);
      });
    },
    handleRequest({ request, event }) {
      return router.handleRequest({ event, request });
    },
  } satisfies WorkerManager;
}
