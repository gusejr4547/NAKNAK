import React from "react";
import "./FollowModal.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";

function ProfileModal(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(loginuser);
  const [accesstoken, setAccessToken] = useRecoilState(token);

  function closeModal() {
    props.closeModal();
  }
  const userDataChange = async () => {
    try {
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/members/update",
        // data:
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const logout = () => {
    setUserData(undefined);
    setAccessToken(undefined);
    localStorage.setItem("key", undefined);
    navigate("/Login");
  };
  return (
    <div className="followModal" onClick={closeModal}>
      <div className="followmodalBody" onClick={(e) => e.stopPropagation()}>
        <button id="followmodalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        <p className="profilemodalbtn" onClick={logout}>
          로그아웃
        </p>
        <Link to="/UserUpdate" className="nav-link">
          <p className="profilemodalbtn">회원정보변경</p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileModal;
