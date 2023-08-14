import { useEffect } from "react";
import fishingSpots from "./fishingSpots";
import { useRecoilState } from "recoil";
import { location_recoil } from "../../utils/atoms";
import { GetLocation, callFlutter } from "../../utils/location";

export const getLocation = () => {
  const [location, setLocation] = useRecoilState(location_recoil);

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
        console.log(locationData);
        setLocation(locationData);
        // {latitude: 35.1029935, longitude: 128.8519049}
      } catch (error) {
        // 오류 처리
      }
    })();
  }

  // ... getLocation 함수 내용을 그대로 복사해 넣으세요 ...
  // 현재 내 위치 받아오기 그리고 저장하기
  let Lat = 35.181473;
  let Lng = 129.211389;
  // 내 위치에서 가까운 낚시터 찾기
  // 추가해야할 것 : 원투 루어에 맞춰서 나오게 하기

  const getLocation = () => {
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
    return location;
  };
};
