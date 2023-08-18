import React, { useEffect, useState } from "react";
// import * as S from "./profileStyle";
import "./profile.css";
// import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
// import { Button } from "react-bootstrap";
import Following from "./Following";
import Follower from "./Follower";
import Mypost from "./Mypost";
import Profileinventory from "./Profileinventory";
import { useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";
import ProfileModal from "./ProfileModal";
import Profilesea from "../fishbowl/Profilesea";
import Loading from "../common/Loading";

function Profile(props) {
  const userId = useParams().userId;
  const temp = userId.slice(1);
  // console.log(temp);

  const [userData] = useRecoilState(loginuser);
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
    if (activeView === "aquarium") {
      return;
    }
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
      // console.log(response.data);
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
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!profileData) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileTop">
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
          <div className="profile-title">
            <span className="profileusernickname">
              {profileData.memberResponse.nickname}
            </span>
            {/* <span className="profileuserLV">
              LV {profileData.memberStatusResponse.level}
            </span> */}
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
                <div>게시글</div>
                <div>{mypost}</div>
              </div>
            </div>
            <div
              style={{
                width: "33%",
                height: "40%",
                borderRight: "1px solid gray",
              }}
            >
              <Following
                user={profileData.memberResponse.memberId}
                activeView={activeView}
              />
            </div>
            <div style={{ width: "33%", height: "40%" }}>
              <Follower
                user={profileData.memberResponse.memberId}
                activeView={activeView}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="profileMiddle">
        <Profileinventory
          id={profileData.memberResponse.memberId}
          point={profileData.memberStatusResponse.point}
        />
      </div>
      <div className="profileBottom">
        <div className="profiletoggleBar">
          <span
            onClick={() => handleToggle("myPosts")}
            className={
              activeView === "myPosts" ? "profileactive" : "profiledefault"
            }
          >
            게시글
          </span>
          <span
            onClick={() => handleToggle("likePosts")}
            className={
              activeView === "likePosts" ? "profileactive" : "profiledefault"
            }
          >
            좋아요한 게시글
          </span>
          <span
            onClick={() => handleToggle("aquarium")}
            className={
              activeView === "aquarium" ? "profileactive" : "profiledefault"
            }
          >
            수조
          </span>
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
          // <div className="profilebottom">
          <Profilesea />
          // </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
