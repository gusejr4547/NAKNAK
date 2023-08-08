import fishingSpots from "./fishingSpots";

export const getLocation = () => {
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
  console.log(getLocation());
};
