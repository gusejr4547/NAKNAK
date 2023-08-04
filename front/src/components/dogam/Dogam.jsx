import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import axios from "axios";

import "./Dogam.css";
import FishDetailModal from "./FishDetailModal";

const Dogam = (props) => {
  const catched = true;

  const [selectedFish, setSelectedFish] = useState(null);

  const [dogamData, setDogamData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginUser, setloginuser] = useRecoilState(loginuser);

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back(); // 이전 페이지로 이동
    }
  };

  useEffect(() => {
    const getDogam = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api1/api/books/1");
        console.log("response success", response.data);
        setDogamData(response.data);
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
    setSelectedFish(fish);
  };

  const closeFishDetailModal = () => {
    setSelectedFish(null);
  };

  return (
    <div className="dogam-wrapper">
      <img
        src="/assets/icons/x.png"
        alt="exit"
        className="dogam-back-button"
        onClick={goBack}
      />
      <div className="dogam-board">
        <div className="dogam-carousel dogam-disable-scrollbar">
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}
          {/* dummy start */}
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}{" "}
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}{" "}
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}{" "}
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}{" "}
          {dogamData.fishCheck?.all.map((fish) => (
            <div
              key={fish.fishId}
              className={
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
                src={"http://passportlkm.iptime.org:20101" + fish.imgUrl}
                alt={fish.name}
              />
              <h6>{fish.name}</h6>
            </div>
          ))}
          {/* dummy end */}
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      {selectedFish && (
        <FishDetailModal
          fishData={selectedFish}
          onClose={closeFishDetailModal}
        />
      )}
    </div>
  );
};

export default Dogam;
