import axios from "axios";

// const apiUrl = 'http://localhost:3000';

// GET 요청을 보내는 함수
export function getData(url) {
  console.log("/api1" + url);
  return axios.get("/api1" + url);
}

// POST 요청을 보내는 함수
export function postData(url, data) {
  return axios.post("/api1" + url, data);
}
