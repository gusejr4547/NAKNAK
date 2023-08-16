import axios from "axios";

const instance = axios.create({
  baseURL: "/api5",
  params: {
    ServiceKey: process.env.REACT_APP_KMA_APIKEY,
    pageNo: "1",
    numOfRows: "14",
    dataType: "JSON",
  },
});

export default instance;
