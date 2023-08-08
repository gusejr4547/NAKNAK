// import { getLocation } from "../map/getLocation";
import React from "react";
import fishingSpots from "../map/fishingSpots";

const getLocation = () => {
  let Lat = 35.095651;
  let Lng = 128.854831;

  let location = {
    distance: 10,
    title: "",
  };
  for (let i = 0; i < fishingSpots.length; i++) {
    const cal_lat = Math.abs(fishingSpots[i].lat - Lat);
    const cal_lng = Math.abs(fishingSpots[i].lng - Lng);

    const distance = cal_lat * cal_lat + cal_lng * cal_lng;
    if (distance < location.distance) {
      location.distance = distance;
      location.title = fishingSpots[i];
    }
  }
  return location.title.title;
};

const Talk2 = [
  {
    content: "자, 이제 여기 지도 버튼을 클릭해볼까?",
  },
  {
    content: (
      <span>
        현재 네가 있는 여기에서, 갈만한 낚시 장소를 찾아볼까? 지도를 요리조리
        움직여봐. 음.. 내가 보기엔{" "}
        <span className="location">{getLocation()}</span>가 제일 좋을 것 같아!
        한번 클릭해볼래?
      </span>
    ),
  },
  {
    content: "",
  },
];

export default Talk2;
