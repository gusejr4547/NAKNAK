import React, { useState } from "react";
import "./Background.css";
import { useRecoilState } from "recoil";
import { fishingMode_recoil } from "../../utils/atoms";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

const Background = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [fishingMode, setFishingMode] = useRecoilState(fishingMode_recoil);
  const [fishingOpen, setFishingOpen] = useState(false);

  const handleFishingClick = () => {
    setFishingOpen(!fishingOpen);
    setActiveNav(2);
  };
  return (
    <span>
      <div
        className={fishingMode === "selectMode" ? "hidden" : "fishingmode"}
        onClick={handleFishingClick}
      >
        <div className="fishinigmode">
          <span
            className="fishingmode-title"
            fishingOpen={fishingOpen}
            style={{ left: fishingOpen ? "3rem" : "13rem" }}
          ></span>
          {fishingOpen && (
            <span className="nowfishing">
              <Link
                to="/fishing"
                className="nav-link"
                onClick={() => setActiveNav(2)}
              >
                피싱모드 진행 중~ 클릭하면 피싱모드로 이동
              </Link>
            </span>
          )}
        </div>
      </div>
      <div>
        {/* 앞 파도 */}
        <Wave
          className="background_wave1"
          fill="#6ec1df"
          paused={false}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.3,
            points: 4,
          }}
        />
        {/* 뒷 파도 */}
        <Wave
          className="background_wave2"
          fill="#408BD0"
          paused={false}
          options={{
            height: 35,
            amplitude: 20,
            speed: 0.2,
            points: 3,
          }}
        />
      </div>
    </span>
  );
};

export default Background;
