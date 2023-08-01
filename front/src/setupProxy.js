const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시1 설정
  app.use(
    "/api1",
    createProxyMiddleware({
      target: "http://192.168.30.161:8080",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/api1": "",
      },
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
  // 프록시3 설정
  app.use(
    "/api3",
    createProxyMiddleware({
      target: "https://apihub.kma.go.kr/api/typ01/url",
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
};
