import React, { useEffect, useState } from "react";
// import * as S from "./profileStyle";
import "./profile.css";
// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { loginuser, token } from "../../utils/atoms";
// import { Button } from "react-bootstrap";
import Following from "./Following";
import Follower from "./Follower";
import Mypost from "./Mypost";
import Profileinventory from "./Profileinventory";
import { useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";
import ProfileModal from "./ProfileModal";
import Profilesea from "../fishbowl/Profilesea";

function Profile(props) {
  const userId = useParams().userId;
  const temp = userId.slice(1);

  // const [userData] = useRecoilState(loginuser);
  // const [accesstoken] = useRecoilState(token);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태
  const [activeView, setActiveView] = useState("myPosts");
  const [modalOpen, setModalOpen] = useState(false);
  const [mypost, setMypost] = useState(0);

  const postplus = (data) => {
    setMypost(data);
  };

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

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
      console.log(response.data);
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
        <img
          className="profilesetting"
          src="/assets/icons/set.png"
          alt=""
          onClick={showModal}
        />
        {modalOpen && (
          <ProfileModal closeModal={setModalOpen} data={profileData} />
        )}
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
          <p>게시글: {mypost}</p>
          <Following user={profileData.memberResponse.memberId} />
          <Follower user={profileData.memberResponse.memberId} />
        </div>
      </div>
      <div
        className="profileMiddle"
        style={{
          // height: "5%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderBottom: "1px solid #000",
        }}
      >
        <Profileinventory
          id={profileData.memberResponse.memberId}
          point={profileData.memberStatusResponse.point}
        />
      </div>
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
          >
            수조
          </button>
        </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
