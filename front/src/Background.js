import React, { useState } from "react";
import "./Background.css";
import { useRecoilState } from "recoil";
import { fishingMode_recoil } from "./atoms";
import { Link } from "react-router-dom";

const Background = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [fishingMode, setFishingMode] = useRecoilState(fishingMode_recoil);

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
      <img src="../assets/cat.png" alt="" className="cat" />
      <img src="../images/island.png" alt="" className="island" />
    </span>
  );
};

export default Background;
