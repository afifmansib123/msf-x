const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
// const withSass = require("@zeit/next-sass");
// const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

// pwa
const withPWA = require('next-pwa');

// module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
//   webpack(config, options) {
//     config.resolve.modules.push(path.resolve("./"));
//     return config;
//   },
// });

module.exports = withPlugins([
    [withPWA, {
        pwa: {
            dest: 'public',
            register: true,
            skipWaiting: true,
        }
    }]
        [withImages]
], {
    reactStrictMode: true,
    webpack(config, options) {
        config.resolve.modules.push(path.resolve("./"));
        return config;
    },
});
