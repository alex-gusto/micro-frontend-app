import getWorkerUrl from "@mf/rspack/get-worker-url";

export const initWorker = async () => {
  return new Worker(await getWorkerUrl(`${process.env.WORKER_URL}worker.js`));
};
