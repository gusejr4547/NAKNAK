// 바다누리 api

import axios from "axios";
// http://www.khoa.go.kr/api/oceangrid/DataType/
// search.do?ServiceKey=인증키&ObsCode=관측소 번호&Date=검색 기준 날짜&ResultType=json

const instance = axios.create({
  baseURL: "/api4",
  params: {
    ServiceKey: "CMs3aH3xwH7cTTCR57ksDQ==",
    ResultType: "json",
  },
});

export default instance;
