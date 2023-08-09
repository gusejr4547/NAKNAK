// import { getLocation } from "../map/getLocation";
import React from "react";
import fishingSpots from "../map/fishingSpots";

// 가까운 낚시터 찾는 함수
const getLocation = () => {
  let Lat = 35.095651;
  let Lng = 128.854831;

  let location = {
    distance: 10,
    title: "",
    lat: 0,
    lng: 0,
  };
  for (let i = 0; i < fishingSpots.length; i++) {
    const cal_lat = Math.abs(fishingSpots[i].lat - Lat);
    const cal_lng = Math.abs(fishingSpots[i].lng - Lng);

    const distance = cal_lat * cal_lat + cal_lng * cal_lng;
    if (distance < location.distance) {
      location.distance = distance;
      location.title = fishingSpots[i].title;
      location.lat = fishingSpots[i].lat;
      location.lng = fishingSpots[i].lng;
    }
  }
  return location;
};

const Talk2 = [
  {
    content: "자, 이제 여기 지도 버튼을 클릭해볼까?",
  },
  {
    content: (
      <span className="map-newbie-talk">
        현재 네가 있는 여기에서, 갈만한 낚시 장소를 찾아보자. 음.. 내가 보기엔{" "}
        <span className="location">{getLocation().title}</span>가 제일 좋을 것
        같아!
      </span>
    ),
    spot_lng: `${getLocation().lng}`,
    spot_lat: `${getLocation().lat}`,
  },
  {
    content: "자 마커를 한번 클릭해볼래?",
  },
  {
    content: "여기서 낚시에 필요한 정보들을 볼 수 있어.",
  },
  {
    content: "자 이제 밖으로 나가볼까?",
  },
];

export default Talk2;
