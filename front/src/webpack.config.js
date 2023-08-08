const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 엔트리 파일 경로 설정
  output: {
    path: path.resolve(__dirname, "dist"), // 출력 폴더 경로 설정
    filename: "bundle.js", // 번들 파일 이름 설정
  },
  plugins: [
    new CopyPlugin({
      // Use copy plugin to copy *.wasm to output folder.
      patterns: [
        {
          from: "node_modules/onnxruntime-web/dist/*.wasm",
          to: "static/js/[name][ext]",
        },
      ],
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // JSX 파일 처리를 위한 로더 설정
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Babel 로더를 사용하여 JSX 파일 변환
        },
      },
    ],
  },
};
