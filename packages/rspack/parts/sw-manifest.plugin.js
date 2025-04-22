const { RspackManifestPlugin } = require('rspack-manifest-plugin');

const hasHash = path => /\.[a-f0-9]{0,32}\./.test(path);

const getRevision = ({ isChunk, chunk, path }) => {
  if (hasHash(path)) return null;

  if (!isChunk) return null;

  if (chunk.contentHash) {
    return Object.values(chunk.contentHash)[0];
  }

  return chunk.hash;
};

module.exports.swManifestPlugin = () => {
  return new RspackManifestPlugin({
    seed: [],
    generate(seed, files) {
      const chunks = files
        .map(file => {
          if (file.isAsset) return null; // TODO: generate revision for assets

          return {
            url: file.path,
            revision: getRevision(file),
          };
        })
        .filter(Boolean);

      return [...seed, ...chunks];
    },
    filter: ({ path }) => {
      return !path.endsWith('.map');
    },
    serialize: obj => JSON.stringify(obj),
  });
};
