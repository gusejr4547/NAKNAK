import React from "react";
import { useRecoilState } from "recoil";
import { favoritePoint_recoil } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { Link } from "react-router-dom";
function FavoriteSpot({ index, title, latitude, longitude, fishingHoleId }) {
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
      <h3>
        {index + 1}
        <Link to="/Map" state={{ favLat: latitude, favLng: longitude }}>
          {title}
        </Link>
      </h3>
      <p>위도: {latitude}</p>
      <p>경도: {longitude}</p>
      {/* 추가 정보를 표시할 수 있음 */}
      <span>
        <button onClick={unlikeLocation}>삭제</button>
      </span>
    </div>
  );
}

export default FavoriteSpot;
