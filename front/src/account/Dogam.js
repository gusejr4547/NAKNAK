import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../atoms";

import "./Dogam.css";
import FishDetailModal from "./FishDetailModal";

const Dogam = (props) => {
  const catched = true;

  const [selectedFish, setSelectedFish] = useState(null);

  const [dogamData, setDogamData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginUser, setloginuser] = useRecoilState(loginuser);

  const URL = "http://localhost:8080/";

  useEffect(() => {
    const getDogam = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/books/1");
        setDogamData(response.data);
        console.log(dogamData, 123);
        console.log(response.data, 456);
        setLoading(false);
      } catch (error) {
        console.error("Error posting data:", error);
        setError("데이터 전송에 실패했습니다.");
        setLoading(false);
      }
    };
    getDogam();
  }, []);

  const openModal = (fish) => {
    setSelectedFish(fish);
  };

  const closeModal = () => {
    setSelectedFish(null);
  };

  return (
    <div className="dogam-carousel dogam-wrapper">
      <div className="dogam-board">
        {dogamData.fishCheck?.all.map((fish) => (
          <div
            key={fish.fishId}
            className={"dogam-slide" + (catched ? "" : " dogam-slide-inactive")}
            onClick={() => openModal(fish)}
          >
            <img src={URL + fish.imgUrl} alt={fish.name} />
            <h6>{fish.name}</h6>
          </div>
        ))}
      </div>

      {/* 모달 컴포넌트 */}
      {selectedFish && (
        <FishDetailModal fishData={selectedFish} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dogam;
