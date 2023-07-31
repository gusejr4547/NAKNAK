import React, { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../../api/SeaAPI";

// https://marineweather.nmpnt.go.kr/serviceReq/serviceOpenApiIntro.do
function Infoapi(props) {
  const [data, setData] = useState(null);

  const fetchData = async (props) => {
    try {
      console.log(props);
      const response = await axios.get(
        `openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}`
      );
      // const response = await axios.get(
      //   `/api2/openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}&serviceKey=102D1304-985C-4C11-89D1-574914365F64&resultType=json`
      // );
      // const response = await axios.get(
      //   `/api2/openWeatherNow.do?mmaf=101&mmsi=994401578&serviceKey=102D1304-985C-4C11-89D1-574914365F64&resultType=json`
      // );

      setData(response.data.result.recordset);
      console.log(response.data.result.recordset);
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
          <h2>Weather Information</h2>
          <p>현재위치: {data[0].MMSI_NM}</p>
          <p>습도: {data[0].HUMIDITY}</p>
          <p>기온: {data[0].AIR_TEMPERATURE}</p>
          <p>위도: {data[0].LATITUDE}</p>
          <p>경도: {data[0].LONGITUDE}</p>
          <p>풍향: {data[0].WIND_DIRECT}</p>
          <p>기압: {data[0].AIR_PRESSURE}</p>
          <p>풍속: {data[0].WIND_SPEED}</p>
          <p>수온: {data[0].WATER_TEMPER}</p>
        </div>
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default Infoapi;
