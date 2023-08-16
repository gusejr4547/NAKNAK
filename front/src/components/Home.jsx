<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
=======
import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
<<<<<<< HEAD
import { loginuser } from "../utils/atoms";

function Home(props) {
  const [userData] = useRecoilState(loginuser);
=======
import { loginuser, newbie_recoil, sleeping_recoil } from "../utils/atoms";

function Home({ newbieVersion }) {
  const [userData] = useRecoilState(loginuser);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [sleep, setSleep] = useRecoilState(sleeping_recoil);

  const navigate = useNavigate();

  useEffect(() => {
    if (newbie) {
      setSleep(false);
    }

    setNewbie(newbieVersion);
  }, [newbieVersion]);

  const cameraClick = () => {
    navigate("/Camera");
  };

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const settings = {
    dots: true, // 페이지 번호를 나타냄
    infinite: true, // 무한 루프
    speed: 300, // 애니메이션 속도 (밀리초 단위)
<<<<<<< HEAD
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 3, // 스크롤할 슬라이드 수
    rows: 2,
    swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
=======
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 스크롤할 슬라이드 수
    rows: 2,
    slidesPerRow: 3,

    // swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
    swipe: !newbieVersion,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  };

  return (
    <div className="home-container">
      <div className="home-image-container">
<<<<<<< HEAD
        <img src="assets/images/mainballoon.png" alt="mainimg import error" />
      </div>
      <div className="home-board">
        <Slider {...settings} className="home-carousel">
          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Dogam" className="nav-link">
              <img src="/assets/icons/do.PNG" alt="icon" />
              <h6>도감</h6>
            </Link>
          </div>
          {/* slide unit end */}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Fishpic" className="nav-link">
              <img src="/assets/icons/camera.PNG" alt="icon" />
              <h6>카메라</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Inventory" className="nav-link">
              <img src="/assets/icons/on.PNG" alt="icon" />
              <h6>인벤토리</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to={`/Profile/:${userData.memberId}`} className="nav-link">
              <img src="/assets/icons/pro.PNG" alt="icon" />
              <h6>프로필</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Map" className="nav-link">
              <img src="/assets/icons/ji.PNG" alt="icon" />
              <h6>지도</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* slide unit start*/}
          <div className="home-slide">
            <Link to="/Board" className="nav-link">
              <img src="/assets/icons/ge.PNG" alt="icon" />
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
              <img src="/assets/icons/tank.PNG" alt="icon" />
              <h6>수조</h6>
            </Link>
          </div>
          {/* slide unit end*/}

          {/* dummy data start*/}
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
=======
        {newbieVersion === 1 ? (
          <img
            src="assets/images/mainballoon2.png"
            alt="mainimg import error"
          />
        ) : newbieVersion === 5 ? (
          <img
            src="assets/images/mainballoon3.png"
            alt="mainimg import error"
          />
        ) : (
          <img src="assets/images/mainballoon.png" alt="mainimg import error" />
        )}
      </div>
      <div className="home-board">
        {sleep ? (
          ""
        ) : (
          <Slider {...settings} className="home-carousel">
            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Dogam" className="nav-link">
                <img src="/assets/homeicons/dogam.png" alt="icon" />
                <h6>도감</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${
                newbieVersion === 1 ? "non-clickable" : ""
              }`}
            >
              <img
                src="/assets/homeicons/camera.png"
                alt="icon"
                onClick={() => cameraClick()}
              />
              <h6>카메라</h6>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Inventory" className="nav-link">
                <img src="/assets/homeicons/inventory.png" alt="icon" />
                <h6>인벤토리</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            {userData?.memberId !== undefined ? (
              <div
                className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
              >
                <Link
                  to={`/Profile/:${userData.memberId}`}
                  className="nav-link"
                >
                  <img src="/assets/icons/pro2.png" alt="icon" />
                  <h6>프로필</h6>
                </Link>
              </div>
            ) : (
              <div className="home-slide">
                <img src="/assets/icons/pro2.png" alt="icon" />
                <h6>프로필</h6>
              </div>
            )}
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${
                newbieVersion === 5 ? "non-clickable" : ""
              }`}
            >
              <Link to="/Map" className="nav-link">
                <img src="/assets/icons/ji.png" alt="icon" />
                <h6>낚시터</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Board" className="nav-link">
                <img src="/assets/homeicons/messenger.png" alt="icon" />
                <h6>SNS</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Balls" className="nav-link">
                <img src="/assets/homeicons/fishbowl.png" alt="icon" />
                <h6>수조</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Dict" className="nav-link">
                <img src="/assets/homeicons/dictionary.png" alt="icon" />
                <h6>사전</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/Achievements" className="nav-link">
                <img src="/assets/homeicons/awards.png" alt="icon" />
                <h6>업적</h6>
              </Link>
            </div>
            {/* slide end */}

            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/FavoriteSpots" className="nav-link">
                <img src="/assets/homeicons/star.png" alt="icon" />
                <h6>즐겨찾기</h6>
              </Link>
            </div>
            {/* slide end */}
          </Slider>
        )}
      </div>
      <div className="cat" onClick={() => setSleep(!sleep)}>
        {sleep ? (
          <div className="sleeping_cat"></div>
        ) : (
          <div className="fishing_cat"></div>
        )}
      </div>
      <img src="../assets/images/island.png" alt="" className="island" />
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    </div>
  );
}

export default Home;
