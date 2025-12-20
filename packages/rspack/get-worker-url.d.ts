interface GetWorkerUrlOptions {
  skipSameOrigin?: boolean;
  useBlob?: boolean;
}

declare function getCrossOriginWorkerURL(
  originalWorkerUrl: string,
  options?: GetWorkerUrlOptions
): Promise<string>;

export = getCrossOriginWorkerURL;
