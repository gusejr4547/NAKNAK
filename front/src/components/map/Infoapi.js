import React, { useEffect } from "react";
import axios from "../../api/SeaAPI";

function Infoapi(props) {
  const fetchData = async (props) => {
    try {
      console.log(props);
      const response = await axios.get(
        `openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}`
        // {
        //   withCredentials: true, // CORS 이슈를 해결하기 위해 자격 증명 포함
        // }
      );
      console.log("성공");
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => fetchData({ mmaf: 101, mmsi: 994401578 })}>
        클릭
      </button>
    </div>
  );
}

export default Infoapi;
