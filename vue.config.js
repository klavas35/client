// vue.config.js file to be placed in the root of your repository
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' + process.env.CI_PROJECT_NAME + '/' : '/',
  transpileDependencies: [
    "@splidejs"
  ],
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' + process.env.CI_PROJECT_NAME + '/' : '/'
}

module.exports = {
  chainWebpack: (config) => {
    config.plugin("polyfills").use(NodePolyfillPlugin);
  },
};