import React, { useEffect, useState } from "react";
// import * as S from "./profileStyle";

// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { loginuser, token } from "../../utils/atoms";
// import { Button } from "react-bootstrap";
import Following from "./Following";
import Follower from "./Follower";
import { useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

function Profile(props) {
  const userId = useParams().userId;
  const temp = userId.slice(1);

  // const [userData] = useRecoilState(loginuser);
  // const [accesstoken] = useRecoilState(token);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

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
    <div>
      <h1>프로필</h1>
      <div className="profileContainer">
        <div className="profileimgBox">
          {profileData.memberResponse.memberImage?.fileUrl && (
            <img
              className="profileImg"
              src={profileData.memberResponse.memberImage.fileUrl}
              alt="profileimg"
              style={{ width: "150px" }}
            />
          )}
        </div>
        <div className="profileBox">
          <p className="usernickname">
            닉네임 : {profileData.memberResponse.nickname}
          </p>
          <p className="userLV">
            LV : {profileData.memberStatusResponse.level}
          </p>
          <p className="usernewBee">
            초보자 :{" "}
            {profileData.memberStatusResponse.newBee ? "Newbee" : "Expert"}
          </p>
          <p className="userpoint">
            포인트 : {profileData.memberStatusResponse.point}
          </p>

          <div className="followContainer">
            <Following user={profileData.memberResponse.memberId} />
            <Follower user={profileData.memberResponse.memberId} />
          </div>
          <div>내가 쓴 게시글</div>
          <div>내가 좋아요한 게시글</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
