const fs = require("fs");
const dotEnv = require("dotenv");
const dotEnvExpand = require("dotenv-expand");
const paths = require("./paths");

const { NODE_ENV } = process.env;

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve("./paths")];

const dotenvFiles = [
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  paths.dotEnv,
  NODE_ENV !== "test" && `${paths.dotEnv}.local`,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
const envVars = dotenvFiles.reduce((acc, dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    const expanded = dotEnvExpand.expand(
      dotEnv.config({ path: dotenvFile, override: true })
    );
    return {
      ...acc,
      ...expanded.parsed,
    };
  }

  return acc;
}, {});

module.exports.getClientEnvironment = () => {
  return Object.entries(envVars).reduce((acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value);
    return acc;
  }, {});
};
