import React from "react";
import { favoritePoint_recoil, location_recoil } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import FavoriteSpot from "./FavoriteSpot";
import "./FavoriteSpots.css";

function FavoriteSpots() {
  const [favoritePoint] = useRecoilState(favoritePoint_recoil);
  const [location] = useRecoilState(location_recoil);

  // 위도 경도로 거리 구하기
  function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    var lat1 = coords1[0];
    var lon1 = coords1[1];

    var lat2 = coords2[0];
    var lon2 = coords2[1];

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c).toFixed(2);

    return d;
  }
  return (
    <div className="FavoriteSpots-wrapper">
      <span className="FavoriteSpots-title">즐겨찾기</span>
      <div className="FavoriteSpot-carousel FavoriteSpot-disable-scrollbar">
        {favoritePoint.map((point, index) => (
          <FavoriteSpot
            key={index}
            index={index}
            fishingHoleId={point.fishingHoleId}
            title={point.title}
            latitude={point.latitude}
            longitude={point.longitude}
            distance={haversineDistance(
              [point.latitude, point.longitude],
              [location.latitude, location.longitude]
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteSpots;
