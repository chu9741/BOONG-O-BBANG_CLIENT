const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/oauth2.0": {
        target: "https://nid.naver.com/",
        changeOrigin: true,
        logLevel: "debug",
      },
      "/v1": {
        target: "https://openapi.naver.com/",
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
});
