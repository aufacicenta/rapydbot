const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
