import React, { useState } from "react";
import "./Background.css";
import { useRecoilState } from "recoil";
import { fishingMode_recoil } from "../../utils/atoms";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

const Background = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [fishingMode, setFishingMode] = useRecoilState(fishingMode_recoil);
  // 고양이가 자고 있음 => 말풍선에 다양한 팁
  // 클릭하면 고양이가 일어나고 여러가지 기능 사용 가능

  return (
    <span>
      <div className={fishingMode === "selectMode" ? "hidden" : "fishingMode"}>
        <Link
          to="/fishing"
          className="nav-link"
          onClick={() => setActiveNav(2)}
        >
          피싱모드가 진행 중입니다. 클릭하시면 피싱으로 갑니다.
        </Link>
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
