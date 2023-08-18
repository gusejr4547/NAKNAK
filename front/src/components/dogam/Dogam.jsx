import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";

import "./Dogam.css";
import FishDetailModal from "./FishDetailModal";

const Dogam = (props) => {
  // const catched = true;

  const [selectedFish, setSelectedFish] = useState(null);
  const [user, setUser] = useRecoilState(loginuser);
  const [dogamData, setDogamData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [loginUser, setloginuser] = useRecoilState(loginuser);

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back(); // 이전 페이지로 이동
    }
  };

  useEffect(() => {
    const getDogam = async () => {
      try {
        setLoading(true);
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/books/${user.memberId}`,
        });

        console.log("response success", response.data);
        setDogamData(response.data);
        console.log(dogamData.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dogam:", error);
        setError("데이터 로드에 실패했습니다.");
        setLoading(false);
      }
    };
    getDogam();
  }, []);

  const openFishDetailModal = (fish) => {
    if (dogamData.fishCheck.chk.includes(fish.fishId)) {
      setSelectedFish(fish);
      console.log(fish);
      // console.log(selectedFish);
    } else {
      setSelectedFish(null);
    }
  };

  const closeFishDetailModal = () => {
    setSelectedFish(null);
  };

  return (
    <div className="dogam-wrapper">
      <div className="dogam-board">
        <div className="dogam-carousel dogam-disable-scrollbar">
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" +
                (dogamData.fishCheck.chk.includes(fish.fishId)
                  ? ""
                  : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={process.env.REACT_APP_BACKEND_URL + fish.imgUrl}
                alt={fish.name}
              />
              <div className="dogam-slide-fishName">
                <h6>{fish.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      {selectedFish && (
        <FishDetailModal
          fishData={selectedFish}
          userFishData={
            dogamData.list &&
            dogamData.list.find((fish) => fish.fishId === selectedFish.fishId)
          }
          onClose={closeFishDetailModal}
        />
      )}
    </div>
  );
};

export default Dogam;
