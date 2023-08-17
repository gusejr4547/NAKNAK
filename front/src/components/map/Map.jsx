import React, { useEffect, useState } from "react";
import "./Map.css";
import axios from "../../api/KMAAPI";

import MapModal from "./MapModal";

import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  newbie_recoil,
  mooltae_recoil,
  tts_recoil,
  weatherInfo_recoil,
  location_recoil,
} from "../../utils/atoms";
// import axios from "../../api/SeaAPI";
// import bada_axios from "../../api/BadanuriAPI";

// import { Weather } from "./Weather";
import Talk2 from "../freshman/Talk2";
import TTS from "../freshman/TTS";
import { useLocation } from "react-router-dom";
import { GetXY } from "./GetXY";
import { GetLocation, callFlutter } from "../../utils/location";
import fishingspot from "../../utils/data/fishingspot.json";

function Map() {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [inputData, setinputData] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [newbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(1);
  const [mooltae, setMooltae] = useRecoilState(mooltae_recoil);
  const lunar = require("cky-lunar-calendar");
  const [tts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);
  const [weatherInfo, setWeatherInfo] = useRecoilState(weatherInfo_recoil);
  const [location, setLocation] = useRecoilState(location_recoil);
  // const [data, setData] = useState({});
  const { state } = useLocation();
  const now = new Date();
  const targetHours = [2, 5, 8, 11, 14, 17, 20, 23];
  const talkContents = Talk2(); // Talk2Component를 호출하여 반환된 배열을 저장
  const [currentsearchData, setCurrentSearchData] = useState([]);

  // 현재위치 받아오기 렌더링 순서 달라서 재정비해야함
  useEffect(() => {
    handlebutton();
  }, []);

  const handlebutton = () => {
    if (window.flutter_inappwebview) {
      handleButtonClick();
    } else {
      handleClick();
    }
  };

  async function handleButtonClick() {
    const data = await callFlutter();
    setLocation(data);
    // {latitude: 35.1029935, longitude: 128.8519049}
  }

  // 버튼을 누를 때 호출되는 함수
  function handleClick() {
    (async () => {
      try {
        const locationData = await GetLocation();
        // 위치 데이터를 이용한 추가 작업
        setLocation(locationData);
        // {latitude: 35.1029935, longitude: 128.8519049}
      } catch (error) {
        // 오류 처리
      }
    })();
  }

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

  // 뉴비버젼
  const next = () => {
    setStep(step + 1);
    setShow(false);
  };

  // 검색하기
  const SearchLocation = () => {
    if (!inputData) {
      return;
    }

    if (currentsearchData === inputData) {
      // setinputData([]);
      return;
    }
    if (!inputData) {
      setCurrentSearchData([]);
    }
    setSearchData([]);
    const arr = [];
    fishingspot.forEach((ele) => {
      if (ele.title.includes(inputData)) {
        arr.push(ele);
        setSearchData(...searchData, arr);
      }
      setCurrentSearchData(inputData);
    });
  };

  const Search = (event) => {
    if (!inputData) {
      setCurrentSearchData([]);
    }
    if (event.key === "Enter") {
      if (!inputData) {
        return;
      }
      if (currentsearchData === event.target.value) {
        // setinputData([]);
        return;
      }
      setSearchData([]);
      const arr = [];
      fishingspot.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
        setCurrentSearchData(inputData);
      });
      // console.log(searchData);
      // setinputData([]);
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
        center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
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
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      var marker = new kakao.maps.Marker();
      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        var latlng = mouseEvent.latLng;
        const rs = GetXY("toXY", latlng.getLat(), latlng.getLng());

        // 모달을 만들어보자
        mool(luna, latlng.getLng());

        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              // var detailAddr = !!result[0].road_address
              //   ? "<div>도로명주소 : " +
              //     result[0].road_address.address_name +
              //     "</div>"
              //   : "";
              // console.log("주소", result[0].address);
              var content =
                result[0].address.region_1depth_name +
                " " +
                result[0].address.region_2depth_name;

              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              Weather(
                closestPreviousTime.date,
                closestPreviousTime.time,
                rs.x,
                rs.y,
                null,
                content,
                latlng.getLat(),
                latlng.getLng()
              );
            }
          }
        );
      });

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 낚시스팟 마커 생성
      for (let i = 0; i < fishingspot.length; i++) {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: fishingspot[i].title,
          position: new kakao.maps.LatLng(
            fishingspot[i].lat,
            fishingspot[i].lng
          ), // 마커를 표시할 위치
        });

        clusterer.addMarker(marker);

        const overlay = new kakao.maps.CustomOverlay({
          content: `<div id='title'>${fishingspot[i].title}</div>`,
          map: map,
          position: marker.getPosition(),
        });
        overlay.setMap(map);

        kakao.maps.event.addListener(map, "zoom_changed", function () {
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
          makeOverListener(fishingspot[i])
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

      function makeOverListener(markerPosition) {
        return function () {
          //   console.log(markerPosition);
          const rs = GetXY("toXY", markerPosition.lat, markerPosition.lng);
          // infowindow.open(map, marker);

          Weather(
            closestPreviousTime.date,
            closestPreviousTime.time,
            rs.x,
            rs.y,
            markerPosition.pk,
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
          {talkContents[step].content}
          {talkContents[step].content && (
            <TTS message={talkContents[step].content} />
          )}
          {show && (
            <div
              className="next"
              onClick={() => {
                if (step === 1) {
                  setMyLocation({
                    lat: talkContents[1]?.spot_lat,
                    lng: talkContents[1]?.spot_lng,
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
        <span>
          <input
            className="search"
            placeholder="장소를 검색해주세요."
            onChange={Search}
            onKeyPress={Search}
          />
          <button className="search-btn" onClick={() => SearchLocation()}>
            검색
          </button>
        </span>
        <div className="search-wrapper">
          {searchData &&
            searchData.slice(0, 5).map((data, index) => (
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
