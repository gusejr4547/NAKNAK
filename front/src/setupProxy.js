const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시1 설정
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://192.168.30.161:8080",
      changeOrigin: true,
    })
  );

  // 프록시2 설정
  app.use(
    "/api2",
    createProxyMiddleware({
      target: "http://marineweather.nmpnt.go.kr:8001",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );
};
