import axios from "axios";

const instance = axios.create({
  baseURL: "/api5",
  params: {
    ServiceKey:
      "IyBpLgs+HXdeWgASPeSwX0j4XEfzobLjsi8PCiLTzBRoszEQlPOeIEy4WUM3IUspaQ64t10CPzsMbXEiYa9vrg==",
    pageNo: "1",
    numOfRows: "14",
    dataType: "JSON",
  },
});

export default instance;
