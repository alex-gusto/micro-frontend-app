import type { CleanupResult, InstallResult } from "workbox-precaching";
import { initWorker } from "./worker/init-worker";

const VERSION = process.env.APP_VERSION;
let logEnabled = false;

const log = (...args: unknown[]) =>
  logEnabled &&
  console.log(
    "SW: %c" + VERSION,
    "padding: 0px 2px; border-radius: 2px; background: tomato;",
    ...args
  );

declare const self: ServiceWorkerGlobalScope;

const getWorker = () => initWorker(VERSION);

// Install service worker: fetch manifests and pre-cache
self.addEventListener("install", (event) => {
  const onSuccess = (result: InstallResult) => {
    log("Install: ", result);
  };

  const workerOrPromise = getWorker();

  event.waitUntil(
    Promise.resolve(workerOrPromise)
      .then((worker) => worker.install(event))
      .then(onSuccess)
  );
});

const bc = new BroadcastChannel("sw-updates");

// Activate service worker
self.addEventListener("activate", (event) => {
  const workerOrPromise = getWorker();

  const onSuccess = async (cleanup: CleanupResult) => {
    log("Cleanup result: ", cleanup);

    const existingClients = await self.clients.matchAll({ type: "window" });

    // Force new service worker to controle all tabs
    await self.clients.claim();

    if (existingClients.length > 0) {
      bc.postMessage({ type: "NEW_SW_ACTIVE" });
    }
  };

  event.waitUntil(
    Promise.resolve(workerOrPromise)
      .then((worker) => worker.activate(event))
      .then(onSuccess)
  );
});

self.addEventListener("message", (event) => {
  switch (event.data.type) {
    case "SKIP_WAITING": {
      self.skipWaiting();
      break;
    }

    case "ENABLE_LOGS": {
      logEnabled = event.data.payload;
    }
  }

  log("Message: ", event);
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const workerOrPromise = getWorker();

  if (workerOrPromise instanceof Promise) {
    event.respondWith(
      workerOrPromise.then((worker) => {
        const responsePromise = worker.handleRequest({ request, event });
        if (responsePromise) return responsePromise;

        return fetch(request);
      })
    );
  } else {
    const responsePromise = workerOrPromise.handleRequest({ request, event });
    if (responsePromise) {
      event.respondWith(responsePromise);
    }
  }
});
