import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { Button } from "react-bootstrap";
import Following from "./Following";
import Follower from "./Follower";
import { useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

function Profile(props) {
  const userId = useParams().userId;
  console.log(userId.slice(1));
  const temp = userId.slice(1);
  console.log(temp);
  const [userData] = useRecoilState(loginuser);
  const [accesstoken] = useRecoilState(token);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태
  // console.log(accesstoken)
  // const acctoken = localStorage.getItem("key")

  // const header = useMemo(() => ({
  //   Authorization: accesstoken,
  // }), [accesstoken]);

  const getUser = async () => {
    try {
      // console.log(header)
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/members/${temp}`,
      });
      setProfileData(response.data);
      console.log(response.data, 456);
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
      {profileData && (
        <div className="profileContainer">
          <div className="profileimgBox">
            {profileData && profileData.memberResponse.memberImage?.fileUrl && (
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
