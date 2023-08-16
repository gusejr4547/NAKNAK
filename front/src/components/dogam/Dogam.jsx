<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

import "./Dogam.css";
import FishDetailModal from "./FishDetailModal";

const Dogam = (props) => {
<<<<<<< HEAD
  const catched = true;
=======
  // const catched = true;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

  const [selectedFish, setSelectedFish] = useState(null);

  const [dogamData, setDogamData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [loginUser, setloginuser] = useRecoilState(loginuser);
=======
  // const [loginUser, setloginuser] = useRecoilState(loginuser);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back(); // 이전 페이지로 이동
    }
  };

  useEffect(() => {
    const getDogam = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD
        const response = await axios.get("/api1/api/books/1");
        console.log("response success", response.data);
        setDogamData(response.data);
=======
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/books/1`,
        });

        console.log("response success", response.data);
        setDogamData(response.data);
        console.log(dogamData.list);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
    setSelectedFish(fish);
=======
    if (dogamData.fishCheck.chk.includes(fish.fishId)) {
      setSelectedFish(fish);
    } else {
      setSelectedFish(null);
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
                "dogam-slide" + (catched ? "" : " dogam-slide-inactive")
=======
                "dogam-slide" +
                (dogamData.fishCheck.chk.includes(fish.fishId)
                  ? ""
                  : " dogam-slide-inactive")
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
              }
              onClick={() => openFishDetailModal(fish)}
            >
              <img
<<<<<<< HEAD
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
=======
                src={process.env.REACT_APP_BACKEND_URL + fish.imgUrl}
                alt={fish.name}
              />
              <div className="dogam-slide-fishName">
                <h6>{fish.name}</h6>
              </div>
            </div>
          ))}
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      {selectedFish && (
        <FishDetailModal
          fishData={selectedFish}
<<<<<<< HEAD
=======
          userFishData={
            dogamData.list &&
            dogamData.list.find((userData) => userData.fishId === selectedFish)
          }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
          onClose={closeFishDetailModal}
        />
      )}
    </div>
  );
};

export default Dogam;
