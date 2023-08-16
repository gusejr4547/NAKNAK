import React, { useState } from "react";
import "./Footer.css";
import "../../utils/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  fishingMode_recoil,
  newbie_recoil,
  mapModal_recoil,
  loginuser,
} from "../../utils/atoms";

function Footer(props) {
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

  return (
    <div>
      {userData && (
        <nav className="nav-wrapper">
          <div>
            {!newbie ? (
              <Link to="/" className="nav-link" onClick={handleHomeClick}>
                <FontAwesomeIcon
                  icon="home"
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
              fishingMode === "selectMode" ? "nav-basic" : "nav-hidden"
            }
          >
            {!newbie ? (
              <Link
                to="/fishing"
                className="nav-link"
                onClick={handleFishingClick}
              >
                <FontAwesomeIcon
                  icon="fish"
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
              fishingMode === "selectMode" ? "nav-hidden" : "nav-basic"
            }
          >
            <Link
              to="/Camera"
              className="nav-link"
              onClick={handleFishingClick}
            >
              카메라
              {/* <img src="/assets/icons/camera1.PNG" alt="카메라" /> */}
            </Link>{" "}
          </div>
        </nav>
      )}
    </div>
  );
}

export default Footer;
