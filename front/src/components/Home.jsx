import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
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

  const settings = {
    dots: true, // 페이지 번호를 나타냄
    infinite: true, // 무한 루프
    speed: 300, // 애니메이션 속도 (밀리초 단위)
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 스크롤할 슬라이드 수
    rows: 2,
    slidesPerRow: 3,

    // swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
    swipe: !newbieVersion,
  };

  return (
    <div className="home-container">
      <div className="home-image-container">
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
          <div>"냑냑이를 깨워주세요"</div>
        ) : (
          <Slider {...settings} className="home-carousel">
            {/* slide start */}
            <div
              className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
            >
              <Link to="/SeaScene" className="nav-link">
                <img src="/assets/homeicons/fishbowl.png" alt="icon" />
                <h6>수조</h6>
              </Link>
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
            <div
              className={`home-slide ${
                newbieVersion === 5 ? "non-clickable" : ""
              }`}
            >
              <Link to="/Map" className="nav-link">
                <img src="/assets/homeicons/fishing.png" alt="icon" />
                <h6>낚시터</h6>
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
              <Link to="/FavoriteSpots" className="nav-link">
                <img src="/assets/homeicons/star.png" alt="icon" />
                <h6>즐겨찾기</h6>
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
            {userData?.memberId !== undefined ? (
              <div
                className={`home-slide ${newbieVersion ? "non-clickable" : ""}`}
              >
                <Link
                  to={`/Profile/:${userData.memberId}`}
                  className="nav-link"
                >
                  <img src="/assets/homeicons/profile.png" alt="icon" />
                  <h6>프로필</h6>
                </Link>
              </div>
            ) : (
              <div className="home-slide">
                <img src="/assets/homeicons/profile.png" alt="icon" />
                <h6>프로필</h6>
              </div>
            )}
            {/* slide end */}

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
              <Link to="/Achievements" className="nav-link">
                <img src="/assets/homeicons/checklist.png" alt="icon" />
                <h6>체크리스트</h6>
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
    </div>
  );
}

export default Home;
