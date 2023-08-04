const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001; // 원하는 포트 번호로 변경 가능

// JSON 형태의 데이터를 파싱하기 위해 bodyParser 사용
app.use(bodyParser.json());

// 클라이언트로부터 위치 데이터를 받는 API 엔드포인트
app.post("/api/location", (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(
    `Received location data - Latitude: ${latitude}, Longitude: ${longitude}`
  );
  // 여기서 위치 데이터를 활용하는 작업을 수행합니다. 예를 들어 데이터베이스에 저장하거나 처리합니다.

  // 클라이언트에 응답
  res.send("Location data received.");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
