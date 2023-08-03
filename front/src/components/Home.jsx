import React from "react";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { loginuser } from "../utils/atoms";

function Home(props) {
  const [userData] = useRecoilState(loginuser);
  const settings = {
    dots: true, // 페이지 번호를 나타냄
    infinite: true, // 무한 루프
    speed: 300, // 애니메이션 속도 (밀리초 단위)
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 3, // 스크롤할 슬라이드 수
    rows: 2,
    swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
  };

  return (
    <div className="home-container">
      <div className="home-image-container">
        <img src="assets/images/mainballoon.png" alt="mainimg import error" />
      </div>
      <div className="home-board">
        <Slider {...settings} className="home-carousel">
          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Dogam" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>도감</h6>
            </Link>
          </div>
          {/* slide unit end */}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Fishpic" className="nav-link">
              <img src="/assets/icons/camera1.PNG" alt="icon" />
              <h6>카메라</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Inventory" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>인벤토리</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to={`/Profile/:${userData.memberId}`} className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>프로필</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Map" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>지도</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Board" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>SNS</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* dummy data start*/}
          {/* <div className="home-slide">
            <Link to="/Map" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>Map</h6>
            </Link>
          </div> */}
          <div className="home-slide">
            <Link to="/SeaScene" className="nav-link">
              <img src="/assets/icons/google.PNG" alt="icon" />
              <h6>수조</h6>
            </Link>
          </div>
          <div className="home-slide">
            <img src="/assets/icons/google.PNG" alt="icon" />
            <h6>dummy</h6>
          </div>
          <div className="home-slide">
            <img src="/assets/icons/google.PNG" alt="icon" />
            <h6>dummy</h6>
          </div>
          {/* dummy data end*/}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
