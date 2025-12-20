const TYPE = "application/javascript";

const hasProtocol = (url) => url.includes("://");

const isSameOrigin = (url) =>
  typeof window !== "undefined" &&
  window.location?.origin &&
  url.includes(window.location.origin);

const buildImportScriptsShim = (baseUrl) => `const _importScripts = importScripts;
const _fixImports = (url) => new URL(url, '${baseUrl}').href;
importScripts = (...urls) => _importScripts(...urls.map(_fixImports));`;

const createDataUrl = (shimmedSource) =>
  `data:${TYPE},${encodeURIComponent(shimmedSource)}`;

const resolveBasePath = (url) => {
  if (hasProtocol(url)) {
    return new URL(".", url).href;
  }

  const fallbackBase =
    (typeof window !== "undefined" && window.location?.href) ||
    (typeof self !== "undefined" && self.location?.href);

  if (!fallbackBase) {
    throw new Error("Cannot resolve base path for worker URL");
  }

  return new URL(".", fallbackBase).href;
};

const getCrossOriginWorkerURL = async (originalWorkerUrl, _options = {}) => {
  const options = {
    skipSameOrigin: true,
    useBlob: true,
    ..._options,
  };

  if (options.skipSameOrigin) {
    const sameOriginCandidate =
      !hasProtocol(originalWorkerUrl) || isSameOrigin(originalWorkerUrl);
    if (sameOriginCandidate) {
      return originalWorkerUrl;
    }
  }

  const response = await fetch(originalWorkerUrl);
  const codeString = await response.text();

  // Ensure importScripts resolves relative URLs against the worker's base path.
  const basePath = resolveBasePath(originalWorkerUrl);
  const shimmedSource = buildImportScriptsShim(basePath) + codeString;

  const inlineUrl = createDataUrl(shimmedSource);
  if (!options.useBlob) {
    return inlineUrl;
  }

  return URL.createObjectURL(
    new Blob([`importScripts("${inlineUrl}")`], { type: TYPE })
  );
};

module.exports = getCrossOriginWorkerURL;
