import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// GET 요청을 보내는 함수
export function getData(url) {
    console.log(apiUrl+url);
  return axios.get(`${apiUrl}`+url);
}

// POST 요청을 보내는 함수
export function postData(url,data) {
  return axios.post(`${apiUrl}`+url, data);
}
