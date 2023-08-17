// import { getLocation } from "../map/getLocation";
// import fishingSpots from "../map/fishingSpots";
import fishingspot from "../../utils/data/fishingspot.json";

import { useRecoilState } from "recoil";
import { location_recoil } from "../../utils/atoms";

// 가까운 낚시터 찾는 함수
const GetLocation = () => {
  const [location] = useRecoilState(location_recoil);
  // let Lat = 35.095651; // 이 부분은 추후 location 상태에서 가져오도록 변경할 수 있습니다.
  // let Lng = 128.854831;

  let Lat = location.latitude;
  let Lng = location.longitude;
  let loca = {
    distance: 10,
    title: "",
    lat: 0,
    lng: 0,
  };
  for (let i = 0; i < fishingspot.length; i++) {
    const cal_lat = Math.abs(fishingspot[i].lat - Lat);
    const cal_lng = Math.abs(fishingspot[i].lng - Lng);

    const distance = cal_lat * cal_lat + cal_lng * cal_lng;
    if (distance < loca.distance) {
      loca.distance = distance;
      loca.title = fishingspot[i].title;
      loca.lat = fishingspot[i].lat;
      loca.lng = fishingspot[i].lng;
    }
  }
  return loca;
};

const Talk2 = () => {
  const location = GetLocation();
  const talkContent = [
    {
      id: 0,
      content: "자, 이제 여기 낚시터 버튼을 클릭해보자냥.",
    },
    {
      id: 1,
      content: `
      현재 네가 있는 여기에서, 갈만한 낚시 장소를 찾아보겠다냥.. 냐냐아앙... 내가 보기엔 ${location.title}(이)가 제일 좋을 것 같다냥!
    `,
      spot_lng: `${location.lng}`,
      spot_lat: `${location.lat}`,
    },
    {
      id: 2,

      content: "자 마커를 한번 클릭해볼래?",
    },
    {
      id: 3,

      content: "여기서 낚시에 필요한 정보들을 볼 수 있다냥.",
    },
    {
      id: 4,
      content: "자 이제 홈화면으로 가보자냥.",
    },
    {
      id: 5,
      content: "카메라를 한 번 눌러보라냥",
    },
    {
      id: 6,
      content:
        "라이터와 물고기를 수평으로 놓고 사진을 찍으면 자동으로 물고기 크기를 측정할 수 있다냥.",
    },
    {
      id: 7,
      content:
        "그리고 이게 너의 도감에 들어가서 나중엔 어장에서 확인도 가능하다냥.",
    },
    {
      id: 8,
      content:
        "자. 이제 해야할 일들은 끝이 났다냐냥. 마지막으로 준비물을 체크할 수 있는 체크리스트를 소개해주겠다냥.",
    },
    {
      id: 9,
      content:
        "처음에는 준비물이 많고, 익혀야 할 일들이 많으니까 이 체크리스트를 활용하도록 하라냥.",
    },
    {
      id: 10,
      content: "자. 이제 정말 끝이 났다냥.\n너의 낚낚 생활을 응원하겠다냥!",
    },
  ];
  return talkContent;
};

export default Talk2;
