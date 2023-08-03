import axios from "axios";

const instance = axios.create({
  //   baseURL: "https://apihub.kma.go.kr/api/typ01/url",
  baseURL: "/api3",
  params: {
    authKey: "DeWo9mhFRAelqPZoRbQH9Q",
  },
});

export default instance;
