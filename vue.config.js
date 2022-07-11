// vue.config.js file to be placed in the root of your repository
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? "/https://klavas35.github.io/client/" : "/",
  transpileDependencies: [
    "@splidejs"
  ],
};

module.exports = {
  chainWebpack: (config) => {
    config.plugin("polyfills").use(NodePolyfillPlugin);
  },
};