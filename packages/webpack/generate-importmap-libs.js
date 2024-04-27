const { loadExternals } = require('./parts/externals');
const fs = require('fs');
const { join } = require('path');
const paths = require('./paths');

module.exports = () => {
  // For all externals add 'libs:' prefix
  const imports = Object.fromEntries(loadExternals().map(lib => [lib, `libs:${lib}`]));

  if (!fs.existsSync(paths.appBuild)) {
    fs.mkdirSync(paths.appBuild, console.error);
  }

  fs.writeFileSync(
    join(paths.appBuild, 'importmap-libs.json'),
    JSON.stringify({ imports }, null, '\t'),
    console.error,
  );
};
