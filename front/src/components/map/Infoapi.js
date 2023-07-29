import React, { useEffect, useState } from "react";
import axios from "axios";
// import axios from "../../api/SeaAPI";

function Infoapi(props) {
  const [data, setData] = useState(null);

  const fetchData = async (props) => {
    try {
      console.log(props);
      const response = await axios.get(
        `/api2/openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}&serviceKey=102D1304-985C-4C11-89D1-574914365F64&resultType=json`
      );
      // const response = await axios.get(
      //   `/api2/openWeatherNow.do?mmaf=101&mmsi=994401578&serviceKey=102D1304-985C-4C11-89D1-574914365F64&resultType=json`
      // );
      console.log("성공");
      console.log(response)
      console.log(response.data.result.recordset);
      setData(response.data.result.recordset);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => fetchData({ mmaf: 101, mmsi: 994401578 })}>
        클릭
      </button>
      {data && (
        <div>
          <h2>결과:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Infoapi;
