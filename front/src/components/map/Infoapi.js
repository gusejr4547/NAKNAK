import React, { useEffect, useState } from "react";
// import axios from "axios";
// import axios from "../../api/SeaAPI";
import axios from "../../api/WeatherAPI";

// https://marineweather.nmpnt.go.kr/serviceReq/serviceOpenApiIntro.do
// http://marineweather.nmpnt.go.kr:8001/openWeatherNow.do?serviceKey=인증키&resultType=json&mmaf=기관코드&mmsi=지점코드1,지점코드2
// https://apihub.kma.go.kr/api/typ01/url/sea_obs.php?stn=21229&authKey=DeWo9mhFRAelqPZoRbQH9Q
function Infoapi(props) {
  // const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchData = async (props) => {
    try {
      console.log(props);
      // const response = await axios.get(
      //   `openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}`
      // );
      const response = await axios.get(`sea_obs.php?stn=${props.stn}`);
      // const response = await axios.get(
      //   `/api2/openWeatherNow.do?mmaf=101&mmsi=994401578&serviceKey=102D1304-985C-4C11-89D1-574914365F64&resultType=json`
      // );
<<<<<<< HEAD
      console.log(response.data);
      // setWeather
      // setData(response.data.result.recordset);
      // console.log(response.data.result.recordset);
=======

      setData(response.data.result.recordset);
      console.log(response);
>>>>>>> feature/auth
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <button onClick={() => fetchData({ mmaf: 101, mmsi: 994401578 })}>
        클릭
      </button> */}
      <button onClick={() => fetchData({ stn: 21229 })}>클릭</button>
      {/* {data && (
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
      )} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default Infoapi;
