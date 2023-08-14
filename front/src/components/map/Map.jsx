import React, { useEffect, useState } from "react";
import "./Map.css";
import axios from "../../api/KMAAPI";

import MapModal from "./MapModal";

import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  fishingInfo_recoil,
  newbie_recoil,
  mooltae_recoil,
  tts_recoil,
  weatherInfo_recoil,
} from "../../utils/atoms";
// import axios from "../../api/SeaAPI";
// import bada_axios from "../../api/BadanuriAPI";
import badanuriPositions from "./badanuriPositions";
import fishingSpots from "./fishingSpots";
import markerPositions from "./markerPositions";

// import { Weather } from "./Weather";
import Talk2 from "../freshman/Talk2";
import TTS from "../freshman/TTS";
import { useLocation } from "react-router-dom";
import { GetXY } from "./GetXY";
import { getLocation } from "./getLocation";

function Map2() {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [inputData, setinputData] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(1);
  const [mooltae, setMooltae] = useRecoilState(mooltae_recoil);
  const lunar = require("cky-lunar-calendar");
  const [tts, setTts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);
  const [weatherInfo, setWeatherInfo] = useRecoilState(weatherInfo_recoil);

  const { state } = useLocation();
  const now = new Date();
  const targetHours = [2, 5, 8, 11, 14, 17, 20, 23];

  function getClosestPreviousTime(hours) {
    const currentHour = now.getHours();
    let currentDate = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (currentHour < hours[0]) {
      // 현재 시간이 제일 작은 시간보다 작으면 전날의 제일 큰 시간으로 설정
      currentDate -= 1;
    }

    let closestTime = new Date(
      currentYear,
      currentMonth - 1,
      currentDate,
      hours[hours.length - 1],
      0,
      0
    );

    for (const hour of hours) {
      if (hour <= currentHour) {
        closestTime.setHours(hour);
      } else {
        break;
      }
    }

    const formattedDate = `${closestTime.getFullYear()}${
      (closestTime.getMonth() < 9 ? "0" : "") + (closestTime.getMonth() + 1)
    }${(closestTime.getDate() < 10 ? "0" : "") + closestTime.getDate()}`;
    const formattedHour = `${
      (closestTime.getHours() < 10 ? "0" : "") + closestTime.getHours()
    }00`; // 시간을 2000, 2200 등의 형태로 표시

    return {
      date: formattedDate,
      time: formattedHour,
    };
  }

  const closestPreviousTime = getClosestPreviousTime(targetHours);

  // 기상청 api임

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => setShow(true), tts);
    }
  }, [tts]);

  // 음력 날짜구하기
  function lunarDate() {
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
    setShow(false);
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

  // 카카오 지도
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

      // 즐겨찾기에서 온 경우
      if (state) {
        panTo(state.favLat, state.favLng);
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
          //   makeOverListener("badanuri", fishingSpots[i], i + 114)
          makeOverListener(fishingSpots[i], i + 114)
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
          makeOverListener(badanuriPositions[i], i + 76)
          //   makeOverListener("badanuri", badanuriPositions[i], i + 76)
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
          // makeOverListener("sea", markerPositions[i], i + 1)
          makeOverListener(markerPositions[i], i + 1)
        );
      }

      const Weather = async (
        base_date,
        base_time,
        nx,
        ny,
        pk,
        title,
        lat,
        lng
      ) => {
        try {
          const response = await axios.get(
            `getVilageFcst?base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`
          );
          const result = response.data.response.body.items.item;
          //   setWeatherInfo(response.data.response.body.items.item); // 리코일 상태 업데이트
          const new_data = {};

          new_data["pk"] = pk;
          new_data["title"] = title;
          new_data["lat"] = lat;
          new_data["lng"] = lng;

          result.forEach((item) => {
            new_data[item.category] = item.fcstValue;
          });
          setWeatherInfo(new_data);
          // 모달열기
          setModalOpen(true);
        } catch (e) {
          console.log(e);
        }
      };

      function makeOverListener(markerPosition, pk) {
        return function () {
          console.log("정보들어감");
          //   console.log(markerPosition);
          const rs = GetXY("toXY", markerPosition.lat, markerPosition.lng);
          // infowindow.open(map, marker);

          Weather(
            closestPreviousTime.date,
            closestPreviousTime.time,
            rs.x,
            rs.y,
            pk,
            markerPosition.title,
            markerPosition.lat,
            markerPosition.lng
          );
          // 모달을 만들어보자
          mool(luna, markerPosition.lng);
        };
      }
    });
  }, [myLocation]);

  return (
    <div>
      {!modalOpen && newbie ? (
        <div className="map-newbie-talk-box">
          {Talk2[step].content}
          {Talk2[step].content && <TTS message={Talk2[step].content} />}
          {show && (
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
          )}
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

export default Map2;
