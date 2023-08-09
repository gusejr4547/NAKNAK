const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시1 설정
  app.use(
    "/api1",
    createProxyMiddleware('/api1',{
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '',
      },
    })
  );

  // 프록시2 설정
  app.use(
    "/api2",
    createProxyMiddleware({
      // target: "http://marineweather.nmpnt.go.kr:8001",
      target: process.env.REACT_APP_WEATHER_URL,
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
      // target: "https://apihub.kma.go.kr/api/typ01/url",
      target: process.env.REACT_APP_KMA_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
  // 프록시4 설정 => 바다누리
  app.use(
    "/api4",
    createProxyMiddleware({
      // target: "http://www.khoa.go.kr/api/oceangrid",
      target: process.env.REACT_APP_BADA_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
    })
  );
};
