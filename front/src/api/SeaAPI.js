import axios from "axios";

const instance = axios.create({
  baseURL: "http://marineweather.nmpnt.go.kr:8001",
  params: {
    serviceKey: "102D1304-985C-4C11-89D1-574914365F64",
    // serviceKey: "E1EC49DA-8D7C-4C25-B8CF-599A8A85E895",
    resultType: "json",
  },
});

export default instance;
