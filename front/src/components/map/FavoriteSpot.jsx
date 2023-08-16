import React from "react";
import { useRecoilState } from "recoil";
import { favoritePoint_recoil } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { Link } from "react-router-dom";

// import "./FavoriteSpots.css";

function FavoriteSpot({
  index,
  title,
  latitude,
  longitude,
  fishingHoleId,
  distance,
}) {
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);

  // 장소 좋아요취소
  const unlikeLocation = async () => {
    try {
      await authorizedRequest({
        method: "post",
        url: "/api1/api/fishingholes/favorites/cancel",
        data: { fishingHoleId: fishingHoleId },
      });
      const new_data = favoritePoint.filter(
        (item) => item.fishingHoleId !== fishingHoleId
      );
      setFavoritePoint(new_data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="FavoriteSpot">
      <span>
        {index + 1}{" "}
        <Link
          to="/Map"
          state={{
            favLat: latitude,
            favLng: longitude,
          }}
          className="FavoriteSpot-title"
        >
          {title}
        </Link>
        <br />
        <span className="FavoriteSpot-distance">{distance} km</span>
      </span>
      <button onClick={unlikeLocation} className="FavoriteSpot-btn">
        삭제
      </button>
    </div>
  );
}

export default FavoriteSpot;
