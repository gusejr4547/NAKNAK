import React, { useEffect, useState } from "react";
import "./Map.css";

import MapModal from "./MapModal";

import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  fishingInfo_recoil,
  newbie_recoil,
  mooltae_recoil,
} from "../../utils/atoms";

import axios from "../../api/SeaAPI";

import bada_axios from "../../api/BadanuriAPI";
import badanuriPositions from "./badanuriPositions";
import fishingSpots from "./fishingSpots";
import markerPositions from "./markerPositions";
import Talk2 from "../freshman/Talk2";

function Map() {
  const [data, setData] = useRecoilState(fishingInfo_recoil);
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [mapInfomation, setMapInfomation] = useState({});
  const [inputData, setinputData] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(1);
  const [mooltae, setMooltae] = useRecoilState(mooltae_recoil);
  const lunar = require("cky-lunar-calendar");

  // 음력 날짜구하기
  function lunarDate() {
    let now = new Date();

    let dateLunar = lunar.solar2Lunar(
      now.getDate(),
      now.getMonth() + 1,
      now.getFullYear()
    );
    let day = dateLunar[0];
    day += 6;
    while (day >= 15) {
      day -= 15;
    }

    return day;
  }
  const luna = lunarDate();

  function mool(day, lng) {
    // 기준점 34.326232, 126.528165
    // 서해임 => 7물때식
    if (lng < 126.528165) {
      if (day === 0) {
        setMooltae("무시 (7물때식)");
      } else if (day === 14) {
        setMooltae("조금 (7물때식)");
      } else {
        setMooltae(day + "물 (7물때식)");
      }
    } else {
      if (day === 14) {
        setMooltae("조금 (8물때식)");
      } else {
        setMooltae(day + 1 + "물 (8물때식)");
      }
    }
  }

  // 현재 내 위치 받아오기 그리고 저장하기
  let Lat = 35.181473;
  let Lng = 129.211389;

  // 뉴비버젼
  const next = () => {
    setStep(step + 1);
  };

  const Search = (event) => {
    if (event.key === "Enter") {
      setSearchData([]);
      const arr = [];
      badanuriPositions.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      markerPositions.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      fishingSpots.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
    } else {
      setSearchData([]);
      const Data = event.target.value;
      setinputData(Data);
    }
  };
  const kakao = window["kakao"];
  useEffect(() => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

      const options = {
        //지도를 생성할 때 필요한 기본 옵션

        // 로드될때 어디서 로드되는지를 보여줌 => 현재위치 받아서 박기
        center: new kakao.maps.LatLng(Lat, Lng), //지도의 중심좌표.
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
      // 위치 이동 함수
      function panTo(move_lat, move_lng) {
        const moveLatLon = new kakao.maps.LatLng(move_lat, move_lng);
        map.panTo(moveLatLon);
      }
      if (myLocation) {
        panTo(myLocation.lat, myLocation.lng);
      }

      // 낚시스팟 마커 생성
      for (let i = 0; i < fishingSpots.length; i++) {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: fishingSpots[i].title,
          obsCode: fishingSpots[i].obsCode,
          position: new kakao.maps.LatLng(
            fishingSpots[i].lat,
            fishingSpots[i].lng
          ), // 마커를 표시할 위치
        });

        clusterer.addMarker(marker);

        const overlay = new kakao.maps.CustomOverlay({
          content: fishingSpots[i].content,
          map: map,
          position: marker.getPosition(),
        });
        overlay.setMap(map);

        kakao.maps.event.addListener(map, "zoom_changed", function () {
          // 지도의 현재 레벨을 얻어옵니다

          function closeOverlay() {
            overlay.setMap(null);
          }
          const level = map.getLevel();
          if (level > 8) {
            closeOverlay();
          } else {
            overlay.setMap(map);
          }
        });

        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener("badanuri", fishingSpots[i])
        );
      }

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

        const overlay = new kakao.maps.CustomOverlay({
          content: badanuriPositions[i].content,
          map: map,
          position: marker.getPosition(),
        });
        overlay.setMap(map);

        kakao.maps.event.addListener(map, "zoom_changed", function () {
          // 지도의 현재 레벨을 얻어옵니다

          function closeOverlay() {
            overlay.setMap(null);
          }
          const level = map.getLevel();
          if (level > 8) {
            closeOverlay();
          } else {
            overlay.setMap(map);
          }
        });

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

        const overlay = new kakao.maps.CustomOverlay({
          content: markerPositions[i].content,
          title: markerPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다

          map: map,
          position: marker.getPosition(),
        });
        overlay.setMap(map);

        kakao.maps.event.addListener(map, "zoom_changed", function () {
          // 지도의 현재 레벨을 얻어옵니다

          function closeOverlay() {
            overlay.setMap(null);
          }
          const level = map.getLevel();
          if (level > 8) {
            closeOverlay();
          } else {
            overlay.setMap(map);
          }
        });
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
              title: markerPosition.title,
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            });
          } else if (api === "badanuri") {
            // console.log(markerPosition);
            fetchData({
              api: api,
              ObsCode: markerPosition.obsCode,
              title: markerPosition.title,
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            });
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
                TITLE: props.title,
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
          mool(luna, props.lng);
          // 모달열기
          setModalOpen(true);
        } catch (e) {
          console.log(e);
        }
      };
      // 마커 클러스터 생성

      //
    });
  }, [myLocation]);

  return (
    <div>
      {!modalOpen && newbie ? (
        <div className="map-newbie-talk-box">
          {Talk2[step].content}{" "}
          <div
            className="next"
            onClick={() => {
              if (step === 1) {
                setMyLocation({
                  lat: Talk2[1]?.spot_lat,
                  lng: Talk2[1]?.spot_lng,
                });
                next();
              } else {
              }
            }}
          >
            다음 &gt;
          </div>
        </div>
      ) : (
        ""
      )}
      {modalOpen && <MapModal setModalOpen={setModalOpen} />}
      {/* 카카오맵 */}
      <div id="map" className="map"></div>

      <div className="search-location">
        <input
          className="search"
          placeholder="장소를 검색해주세요."
          onChange={Search}
          onKeyPress={Search}
        />
        <div className="search-wrapper">
          {searchData.map((data, index) => (
            <p
              className="mapsearchresult"
              onClick={() =>
                setMyLocation({
                  lat: data.lat,
                  lng: data.lng,
                })
              }
              key={index}
            >
              {data.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map;
