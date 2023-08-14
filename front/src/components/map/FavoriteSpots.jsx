import React from "react";
import { favoritePoint_recoil } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import FavoriteSpot from "./FavoriteSpot";
import "./FavoriteSpots.css";

function FavoriteSpots() {
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);
  return (
    <div className="FavoriteSpots-wrapper">
      <span>즐겨찾기</span>
      <div>
        {favoritePoint.map((point, index) => (
          <FavoriteSpot
            key={index}
            index={index}
            fishingHoleId={point.fishingHoleId}
            title={point.title}
            latitude={point.lat}
            longitude={point.lng}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteSpots;
