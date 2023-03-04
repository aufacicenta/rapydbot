// eslint-disable-next-line import/no-unresolved
const { i18n } = require("./next-i18next.config");

/**
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 */
const regexEqual = (x, y) =>
  x instanceof RegExp &&
  y instanceof RegExp &&
  x.source === y.source &&
  x.global === y.global &&
  x.ignoreCase === y.ignoreCase &&
  x.multiline === y.multiline;

module.exports = {
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === "object");

    if (oneOf) {
      const moduleSassRule = oneOf.oneOf.find((rule) => regexEqual(rule.test, /\.module\.(scss|sass)$/));

      if (moduleSassRule) {
        const sassLoader = moduleSassRule.use.find(({ loader }) => loader.includes("sass-loader"));

        if (sassLoader) {
          sassLoader.options.additionalData = `$basePath:'/';`;
        }
      }
    }

    return config;
  },
};
