require("babel-polyfill");

module.exports = {
    // ...
    entry: ["regenerator-runtime/runtime.js", "./src/main.js"],
    resolve: {
        fallback: {
            util: require.resolve("util/"),
            stream: require.resolve("stream-browserify")
        }
    }
    // ...
};