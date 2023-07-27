import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../atoms";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Dogam.css"; // 별도의 CSS 파일을 생성하여 스타일을 적용합니다.

const Dogam = (props) => {
  const [dogamData, setDogamData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginUser, setloginuser] = useRecoilState(loginuser);

  const URL = "http://192.168.30.161:8080";

  const handleWheel = (e) => {
    // 마우스 휠 동작에 따라 슬라이드를 이동시킵니다.
    e.preventDefault(); // 기본 스크롤 동작을 막습니다.
    const delta = e.deltaY;
    if (delta > 0) {
      slider.slickNext();
    } else {
      slider.slickPrev();
    }
  };

  let slider;

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

  return (
    <div className="dogam-carousel dogam-wrapper">
      <div className="dogam-board">
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {/* dummmy start */}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}{" "}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}{" "}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}{" "}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt={fish.imgUrl} width="100px" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}{" "}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt="이미지가 없습니다" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt="이미지가 없습니다" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt="이미지가 없습니다" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {dogamData.fishCheck?.all.map((fish) => (
          <div key={fish.fishId} className="slide">
            <Link to="/">
              <img src={URL + fish.imgUrl} alt="이미지가 없습니다" />
              <p>{fish.name}</p>
            </Link>
          </div>
        ))}
        {/* dummy end */}
      </div>
    </div>
  );
};

export default Dogam;
