import React, { useState } from "react";
import "./Footer.css";
import "../../utils/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fishingMode_recoil } from "../../utils/atoms";

function Footer(props) {
  const [activeNav, setActiveNav] = useState(1);
  const [fishingMode, setFishingMode] = useRecoilState(fishingMode_recoil);

  return (
    <nav className="nav-wrapper">
      <div>
        <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
          <FontAwesomeIcon
            icon="home"
            className={activeNav === 1 ? "nav-item nav-active" : "nav-item"}
          />
        </Link>
      </div>
      <div className={fishingMode === "selectMode" ? "nav-basic" : "nav-hidden"}>
        <Link
          to="/fishing"
          className="nav-link"
          onClick={() => setActiveNav(2)}
        >
          <FontAwesomeIcon
            icon="fish"
            className={activeNav === 2 ? "nav-item nav-active" : "nav-item"}
          />
        </Link>{" "}
      </div>

      <div className={fishingMode === "selectMode" ? "nav-hidden" : "nav-basic"}>
        <Link
          to="/Fishpic"
          className="nav-link"
          onClick={() => setActiveNav(2)}
        >
          카메라
          {/* <img src="/assets/icons/camera1.PNG" alt="카메라" /> */}
        </Link>{" "}
      </div>

      <div>
        <Link to="/Login" className="nav-link" onClick={() => setActiveNav(3)}>
          <FontAwesomeIcon
            icon="user"
            className={activeNav === 3 ? "nav-item nav-active" : "nav-item"}
          />
        </Link>{" "}
      </div>
    </nav>
  );
}

export default Footer;
