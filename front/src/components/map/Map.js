import MapModal from "./MapModal";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mapModal_recoil, fishingInfo_recoil } from "../../utils/atoms";
import "./Map.css";
import axios from "../../api/SeaAPI";
import bada_axios from "../../api/BadanuriAPI";
import badanuriPositions from "./badanuriPositions";
import markerPositions from "./markerPositions";

function Map() {
  const [data, setData] = useRecoilState(fishingInfo_recoil);
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [mapInfomation, setMapInfomation] = useState({});
  const [inputData, setinputData] = useState("");
  const [searchData, setSearchData] = useState([]);

  const Search = (event) => {
    if (event.key === "Enter") {
      setSearchData([]);
      const arr = [];
      badanuriPositions.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele.title);
          setSearchData(...searchData, arr);
        }
      });
    } else {
      setSearchData([]);
      const Data = event.target.value;
      setinputData(Data);
    }
  };

  useEffect(() => {
    const kakao = window["kakao"];
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

      const options = {
        //지도를 생성할 때 필요한 기본 옵션

        // 로드될때 어디서 로드되는지를 보여줌 => 현재위치 받아서 박기
        center: new kakao.maps.LatLng(35.084833333, 129.033166667), //지도의 중심좌표.
        // center: new kakao.maps.LatLng(35.095651, 128.854831), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const map = new kakao.maps.Map(mapContainer, options); //지도 생성 및 객체 리턴

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5,
        // markers: markers,
      });
      // 바다 누리 마커 생성
      for (let i = 0; i < badanuriPositions.length; i++) {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: badanuriPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          obsCode: badanuriPositions[i].obsCode,
          position: new kakao.maps.LatLng(
            badanuriPositions[i].lat,
            badanuriPositions[i].lng
          ), // 마커를 표시할 위치
        });

        clusterer.addMarker(marker);

        // const overlay = new kakao.maps.CustomOverlay({
        //   content: badanuriPositions[i].content,
        //   map: map,
        //   position: marker.getPosition(),
        // });
        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener("badanuri", badanuriPositions[i])
        );
      }

      // // seaAPI 마커 생성
      for (let i = 0; i < markerPositions.length; i++) {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: markerPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          mmaf: markerPositions[i].mmaf,
          mmsi: markerPositions[i].mmsi,
          position: new kakao.maps.LatLng(
            markerPositions[i].lat,
            markerPositions[i].lng
          ), // 마커를 표시할 위치
        });
        clusterer.addMarker(marker);
        // const overlay = new kakao.maps.CustomOverlay({
        //   content: markerPositions[i].content,
        //   map: map,
        //   position: marker.getPosition(),
        // });

        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener("sea", markerPositions[i])
        );
      }

      function makeOverListener(api, markerPosition) {
        return function () {
          // infowindow.open(map, marker);

          // 해양정보 불러오기 (seaAPI)
          if (api === "sea") {
            fetchData({
              api: api,
              mmaf: markerPosition.mmaf,
              mmsi: markerPosition.mmsi,
            });
          } else if (api === "badanuri") {
            // console.log(markerPosition);
            fetchData({ api: api, ObsCode: markerPosition.obsCode });
          }
          // 모달을 만들어보자
          // setModalOpen(true);
          // console.log(markerPosition);
          setMapInfomation(markerPosition);
        };
      }
      // 해양 정보 받아오는 api
      const fetchData = async (props) => {
        try {
          if (props.api === "sea") {
            const response = await axios.get(
              `openWeatherNow.do?mmaf=${props.mmaf}&mmsi=${props.mmsi}`
            );
            setData(response.data.result.recordset);
          } else if (props.api === "badanuri") {
            const response = await bada_axios.get(
              `buObsRecent/search.do?ObsCode=${props.ObsCode}`
            );
            const new_data = [
              {
                MMSI_NM: response.data.result.meta.obs_post_name,
                AIR_TEMPERATURE: response.data.result.data.air_temp,
                LATITUDE: response.data.result.meta.obs_lat,
                LONGITUDE: response.data.result.meta.obs_lon,
                WIND_DIRECT: response.data.result.data.wind_dir,
                AIR_PRESSURE: response.data.result.data.air_pres,
                WIND_SPEED: response.data.result.data.wind_speed,
                WAVE_HEIGHT: response.data.result.data.wave_height,
                SALINITY: response.data.result.data.Salinity,
                WATER_TEMPER: response.data.result.data.water_temp,
              },
            ];
            setData(new_data);
            // console.log(response.data.result.data);
          }
          // 모달열기
          setModalOpen(true);
        } catch (e) {
          console.log(e);
        }
      };
      // 마커 클러스터 생성
    });
  }, []);

  return (
    <div>
      {modalOpen && <MapModal setModalOpen={setModalOpen} />}
      <div id="map" className="map"></div>
      <input
        className="mapsearch"
        placeholder="검색"
        onChange={Search}
        onKeyPress={Search}
      />
      <div className="mapsearchresult">
        {searchData.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
    </div>
  );
}

export default Map;
