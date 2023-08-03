import React, { useEffect, useState } from "react";
// import * as S from "./profileStyle";

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

function Profile(props) {
  const userId = useParams().userId;
  const temp = userId.slice(1);

  // const [userData] = useRecoilState(loginuser);
  // const [accesstoken] = useRecoilState(token);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태
  const [activeView, setActiveView] = useState("myPosts");
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
        </div>
      </div>
      <div
        className="profileMiddle"
        style={{
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
          >
            수조
          </button>
        </div>
        {activeView === "myPosts" ? (
          <div className="profileMiddle">
            <Mypost id={temp} ver="my-post" />
            <Mypost id={temp} ver="my-like" />
          </div>
        ) : (
          <div className="profileaquarium">
            <p>아쿠아리움</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
