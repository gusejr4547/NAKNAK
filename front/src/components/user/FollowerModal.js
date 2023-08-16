import React, { useEffect, useState } from "react";
import "./FollowModal.css";
import { Link, useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { Button } from "react-bootstrap";

function FollowerModal(props) {
  console.log(props.data);

  const [userData] = useRecoilState(loginuser);
  console.log(userData);
  const [followerData, setFollowerData] = useState(null);
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  function closeModal() {
    props.closeModal();
  }

  function handleProfileLinkClick(memberId) {
    navigate(`/Profile/:${memberId}`);
    window.location.reload();
    closeModal();
  }

  const followUser = async () => {
    if (props.user === userData.memberId) {
      console.log("동일");
      return;
    }

    const param = { follow: props.user };
    // const config = { params: param, headers: header };
    try {
      // const response = await axios.post(
      //   "/api1/api/follow/register",
      //   null,
      //   config
      // );
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/follow/register",
        params: param,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const unFollowUser = async () => {
    if (props.user === userData.memberId) {
      // console.log("동일");
      return;
    }
    const param = { follow: props.user };
    // const config = { params: param, headers: header };
    try {
      // const response = await axios.post(
      //   "/api1/api/follow/cancel",
      //   null,
      //   config
      // );
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/follow/cancel",
        params: param,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="followModal" onClick={closeModal}>
      <div className="followmodalBody" onClick={(e) => e.stopPropagation()}>
        <button id="followmodalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.data.map((item) => (
          <p
            key={item.memberId}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* <Link to={`/Profile/:${item.memberId}`} className="nav-link"> */}
            <span onClick={() => handleProfileLinkClick(item.memberId)}>
              {item.nickname}
            </span>
            {/* {props.data.memberId !== userData.memberId && (
              <Button
                as="input"
                type="button"
                value="팔로우"
                style={{ marginRight: "10px" }}
                onClick={followUser}
              />
            )}
            {props.data.memberId !== userData.memberId && (
              <Button
                as="input"
                type="button"
                value="언팔로우"
                style={{ backgroundColor: "red" }}
                onClick={unFollowUser}
              />
            )} */}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FollowerModal;
