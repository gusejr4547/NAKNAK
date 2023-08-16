<<<<<<< HEAD
import React from "react";
import "./FollowModal.css";
import { Link, useNavigate } from "react-router-dom";

function FollowerModal(props) {
  const navigate = useNavigate();

=======
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
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  function closeModal() {
    props.closeModal();
  }

  function handleProfileLinkClick(memberId) {
<<<<<<< HEAD
    closeModal();
    navigate(`/Profile/:${memberId}`);
  }

=======
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

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  return (
    <div className="followModal" onClick={closeModal}>
      <div className="followmodalBody" onClick={(e) => e.stopPropagation()}>
        <button id="followmodalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.data.map((item) => (
<<<<<<< HEAD
          <p key={item.memberId}>
=======
          <p
            key={item.memberId}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
            {/* <Link to={`/Profile/:${item.memberId}`} className="nav-link"> */}
            <span onClick={() => handleProfileLinkClick(item.memberId)}>
              {item.nickname}
            </span>
<<<<<<< HEAD
            {/* </Link> */}
=======
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
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
          </p>
        ))}
      </div>
    </div>
  );
}

export default FollowerModal;
<<<<<<< HEAD

// import styles from './Modal.css';

// function FollowerModal({ setModalOpen, data}) {
//     // 모달 끄기
//     const closeModal = () => {
//         setModalOpen(false);
//     };

//     return (
//         <div className={styles.container}>
//             <button className={styles.close} onClick={closeModal}>
//                 X
//             </button>
//         {data.map((item) => (
//         <p key={item.memberId}>{item.nickname}</p>
//           ))}
//         </div>
//     );
// }
// export default FollowerModal;
=======
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
