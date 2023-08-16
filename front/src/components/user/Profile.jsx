import React, { useEffect, useState } from "react";
// import * as S from "./profileStyle";
<<<<<<< HEAD

// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { loginuser, token } from "../../utils/atoms";
=======
import "./profile.css";
// import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
// import { Button } from "react-bootstrap";
import Following from "./Following";
import Follower from "./Follower";
import Mypost from "./Mypost";
import Profileinventory from "./Profileinventory";
import { useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";
<<<<<<< HEAD
=======
import ProfileModal from "./ProfileModal";
import Profilesea from "../fishbowl/Profilesea";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

function Profile(props) {
  const userId = useParams().userId;
  const temp = userId.slice(1);
<<<<<<< HEAD

  // const [userData] = useRecoilState(loginuser);
=======
  console.log(temp);

  const [userData] = useRecoilState(loginuser);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  // const [accesstoken] = useRecoilState(token);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태
  const [activeView, setActiveView] = useState("myPosts");
<<<<<<< HEAD
=======
  const [modalOpen, setModalOpen] = useState(false);
  const [mypost, setMypost] = useState(0);

  const postplus = (data) => {
    setMypost(data);
  };

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const handleToggle = (view) => {
    setActiveView(view);
  };

  const getUser = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/members/${temp}`,
      });
      setProfileData(response.data);
<<<<<<< HEAD
=======
      console.log(response.data);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Failed to load data.</div>;
  }

  return (
<<<<<<< HEAD
    <div className="profileContainer" style={{ height: "95%" }}>
      <div
        className="profileTop"
        style={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #000",
        }}
      >
        <div
          className="profileimgBox"
          style={{
            height: "100%",
            width: "35%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="profileusernickname">
            <span className="profileuserLV">
              LV {profileData.memberStatusResponse.level}{" "}
            </span>
            {profileData.memberResponse.nickname}
          </p>
          {profileData.memberResponse.memberImage?.fileUrl && (
            <img
              className="profileImg"
              src={profileData.memberResponse.memberImage.fileUrl}
              alt="profileimg"
              style={{ width: "150px" }}
            />
          )}
        </div>
        <div
          className="profilefollowContainer"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "65%",
            height: " 80%",
          }}
        >
          <p>게시글: 0</p>
          <Following user={profileData.memberResponse.memberId} />
          <Follower user={profileData.memberResponse.memberId} />
=======
    <div className="profileContainer">
      <div
        className="profileTop"
        style={{
          height: "30%",
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // borderBottom: "1px solid #000",
        }}
      >
        <div className="profileimgBox">
          <div className="profileimgbox">
            <img
              className="profileImg"
              src={
                profileData.memberResponse.memberImage?.fileUrl
                  ? `${process.env.REACT_APP_BACKEND_URL}/` +
                    `${profileData.memberResponse.memberImage?.fileUrl}`
                  : "/assets/cats/cat.png"
              }
              alt="profileimg"
              // style={{ width: "150px" }}
            />
          </div>
        </div>
        {profileData.memberResponse.memberId === userData.memberId && (
          <img
            className="profilesetting"
            src="/assets/icons/set.png"
            alt=""
            onClick={showModal}
          />
        )}

        {modalOpen && (
          <ProfileModal closeModal={setModalOpen} data={profileData} />
        )}
        <div className="profilefollowContainer">
          <div
            style={{
              // display: "inline",
              textAlign: "center",
              width: "100%",
              height: " 25%",
              position: "relative",
              top: "25%",
            }}
          >
            <p className="profileusernickname">
              {profileData.memberResponse.nickname}
            </p>
            <span
              className="profileuserLV"
              style={{ margin: "0px", fontSize: "12px", opacity: "0.7" }}
            >
              LV {profileData.memberStatusResponse.level}
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              // alignItems: "center",
              marginTop: "13%",
              width: "100%",
              height: " 70%",
            }}
          >
            <div
              style={{
                width: "33%",
                height: "40%",
                borderRight: "1px solid gray",
              }}
            >
              <div style={{ display: "block" }}>
                <div>{mypost}</div>
                <div>게시글</div>
              </div>
            </div>
            <div
              style={{
                width: "33%",
                height: "40%",
                borderRight: "1px solid gray",
              }}
            >
              <Following user={profileData.memberResponse.memberId} />
            </div>
            <div style={{ width: "33%", height: "40%" }}>
              <Follower user={profileData.memberResponse.memberId} />
            </div>
          </div>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        </div>
      </div>
      <div
        className="profileMiddle"
        style={{
<<<<<<< HEAD
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
=======
          // height: "5%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          // borderRadius: "10%",
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
          borderBottom: "1px solid #000",
        }}
      >
        <Profileinventory
          id={profileData.memberResponse.memberId}
          point={profileData.memberStatusResponse.point}
        />
      </div>
<<<<<<< HEAD
      {/* <p className="usernewBee">
        초보자 : {profileData.memberStatusResponse.newBee ? "Newbee" : "Expert"}
      </p> */}
      <div
        className="profileBottom"
        style={{
          justifyContent: "center",
          alignItems: "center",
          // borderBottom: "1px solid #000",
        }}
      >
        <div className="profiletoggleBar" style={{ display: "flex" }}>
          <button
            onClick={() => handleToggle("myPosts")}
            style={{
              background: activeView === "myPosts" ? "#ccc" : "transparent",
            }}
          >
            내가 쓴 게시글
          </button>
          <button
            onClick={() => handleToggle("aquarium")}
            style={{
              background: activeView === "aquarium" ? "#ccc" : "transparent",
            }}
=======
      <div className="profileBottom">
        <div className="profiletoggleBar" style={{ display: "flex" }}>
          <button
            onClick={() => handleToggle("myPosts")}
            className={
              activeView === "myPosts" ? "profileactive" : "profiledefault"
            }
          >
            게시글
          </button>
          <button
            onClick={() => handleToggle("likePosts")}
            className={
              activeView === "likePosts" ? "profileactive" : "profiledefault"
            }
          >
            좋아요한 게시글
          </button>
          <button
            onClick={() => handleToggle("aquarium")}
            className={
              activeView === "aquarium" ? "profileactive" : "profiledefault"
            }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
          >
            수조
          </button>
        </div>
<<<<<<< HEAD
        {activeView === "myPosts" ? (
          <div className="profileMiddle">
            <Mypost id={temp} ver="my-post" />
            <Mypost id={temp} ver="my-like" />
          </div>
        ) : (
          <div className="profileaquarium">
            <p>아쿠아리움</p>
=======
        {activeView === "myPosts" && (
          <div className="profilebottom">
            <Mypost id={temp} ver="my-post" postplus={postplus} data={mypost} />
          </div>
        )}
        {activeView === "likePosts" && (
          <div className="profilebottom">
            <Mypost id={temp} ver="my-like" />
          </div>
        )}
        {activeView === "aquarium" && (
          <div className="profilebottom">
            <Profilesea />
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
