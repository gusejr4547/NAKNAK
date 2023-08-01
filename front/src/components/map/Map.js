import MapModal from "./MapModal";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mapModal_recoil } from "../../utils/atoms";

import "./Map.css";

// https://apis.map.kakao.com/web/guide/
// 잔상이 남는디..?

function Map() {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [mapInfomation, setMapInfomation] = useState({});

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

      // 마커 설정
      const markerPositions = [
        {
          title: "남항동방파제등대",
          content: `<div>남항동방파제등대</div>`,
          latlng: new kakao.maps.LatLng(35.084833333, 129.033166667),
        },
        {
          title: "부산항신항소형선부두등대",
          content: `<div>부산항신항소형선부두등대</div>`,
          latlng: new kakao.maps.LatLng(35.07763889, 128.7815),
        },
        {
          title: "송정리등표",
          content: `<div>송정리등표</div>`,
          latlng: new kakao.maps.LatLng(35.169166667, 129.2175),
        },
        {
          title: "부산항신항다목적부두",
          content: `<div>부산항신항다목적부두</div>`,
          latlng: new kakao.maps.LatLng(35.07458333, 128.8343889),
        },
        {
          title: "부산항유도등부표(랜비)",
          content: `<div>부산항유도등부표(랜비)</div>`,
          latlng: new kakao.maps.LatLng(35.0665, 129.131),
        },
        {
          title: "남형제도등표",
          content: `<div>남형제도등표</div>`,
          latlng: new kakao.maps.LatLng(34.885166667, 128.95),
        },
        {
          title: "가덕도등대",
          content: `<div>가덕도등대</div>`,
          latlng: new kakao.maps.LatLng(34.9895, 128.829166667),
        },
        {
          title: "나무섬등대",
          content: `<div>나무섬등대</div>`,
          latlng: new kakao.maps.LatLng(34.979666667, 128.9895),
        },
        {
          title: "부산항신항중앙C호등부표",
          content: `<div>부산항신항중앙C호등부표</div>`,
          latlng: new kakao.maps.LatLng(35.024, 128.7885),
        },
        {
          title: "신항유도등부표(랜비)",
          content: `<div>신항유도등부표(랜비)</div>`,
          latlng: new kakao.maps.LatLng(34.966666667, 128.813),
        },
        {
          title: "감천항유도등부표(랜비)",
          content: `<div>감천항유도등부표(랜비)</div>`,
          latlng: new kakao.maps.LatLng(35.032, 129.022166667),
        },
        {
          title: "오륙도등대",
          content: `<div>오륙도등대</div>`,
          latlng: new kakao.maps.LatLng(35.091333333, 129.127),
        },
      ];
      // 마커 생성
      for (let i = 0; i < markerPositions.length; i++) {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: markerPositions[i].latlng, // 마커를 표시할 위치
          // title: markerPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        // 마커에 표시할 인포윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
          content: markerPositions[i].content, // 인포윈도우에 표시할 내용
        });
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener(map, marker, markerPositions[i], infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }
      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, markerPosition, infowindow) {
        return function () {
          infowindow.open(map, marker);
          // 모달을 만들어보자
          setModalOpen(true);
          // console.log(markerPosition);
          setMapInfomation(markerPosition);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
    });
  }, []);

  return (
    <div>
      {modalOpen && <MapModal {...mapInfomation} setModalOpen={setModalOpen} />}
      <div id="map" className="map"></div>
    </div>
  );
}

export default Map;
