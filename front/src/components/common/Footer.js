import React, { useState } from "react";
import "./Footer.css";
import "../../utils/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  fishingMode_recoil,
  newbie_recoil,
  mapModal_recoil,
  loginuser,
} from "../../utils/atoms";

function Footer(props) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(1);
  const [fishingMode] = useRecoilState(fishingMode_recoil);
  const [newbie] = useRecoilState(newbie_recoil);
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [userData] = useRecoilState(loginuser);

  const handleHomeClick = () => {
    setActiveNav(1);
    setModalOpen(false);
  };

  const handleFishingClick = () => {
    setActiveNav(2);
    setModalOpen(false);
  };

  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <div>
      {userData && (
        <nav className="nav-wrapper">
          <div className="nav-icon">
            {!newbie ? (
              <Link
                to="/"
                className="nav-link nav-icon"
                onClick={handleHomeClick}
              >
                <FontAwesomeIcon
                  icon="home"
                  size="lg"
                  className={
                    activeNav === 1 ? "nav-item nav-active" : "nav-item"
                  }
                />
              </Link>
            ) : (
              <FontAwesomeIcon
                icon="home"
                className={activeNav === 1 ? "nav-item nav-active" : "nav-item"}
              />
            )}
          </div>

          <div
            className={
              fishingMode === "selectMode"
                ? "nav-basic nav-icon"
                : "nav-hidden nav-icon"
            }
          >
            {!newbie ? (
              <Link
                to="/fishing"
                className="nav-link nav-icon"
                onClick={handleFishingClick}
              >
                <FontAwesomeIcon
                  icon="fish"
                  size="lg"
                  className={
                    activeNav === 2 ? "nav-item nav-active" : "nav-item"
                  }
                />
              </Link>
            ) : (
              <FontAwesomeIcon
                icon="fish"
                className={activeNav === 2 ? "nav-item nav-active" : "nav-item"}
              />
            )}
          </div>

          <div
            className={
              fishingMode === "selectMode"
                ? "nav-hidden nav-icon"
                : "nav-basic nav-icon"
            }
          >
            <Link
              to="/Camera"
              className="nav-link nav-icon"
              onClick={handleFishingClick}
            >
              <FontAwesomeIcon icon="fa-solid fa-camera" size="lg" />
              {/* <img src="/assets/icons/camera1.PNG" alt="카메라" /> */}
            </Link>{" "}
          </div>
          <div className="nav-icon">
            {!newbie ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angles-left"
                size="lg"
                onClick={onClickBtn}
                className={activeNav === 3 ? "nav-item nav-active" : "nav-item"}
              />
            ) : (
              <FontAwesomeIcon
                icon="AnglesLeft"
                className={activeNav === 3 ? "nav-item nav-active" : "nav-item"}
              />
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

export default Footer;
