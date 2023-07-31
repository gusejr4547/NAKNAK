import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";


function Profile(props) {
    const [userData, setUserData] = useRecoilState(loginuser);
    const [accesstoken, setAccessToken] = useRecoilState(token);
    const [profileData, setProfileData] = useState(null);
    const header = {
        Authorization: accesstoken,
      };

    useEffect(() => {
        const getUser = async () => {
          try {
            const response = await axios.get(`/api/members/${userData.memberId}`, {
                headers: header,
              });
            setProfileData(response.data);
            console.log(profileData, 123);
            console.log(response.data, 456);
          } catch (error) {
            console.error("Error posting data:", error);
          }
        };
        getUser();
      }, []);

    return (
        <div>
            <h1>프로필</h1>
            {profileData && (
          <div className="profileContainer">
            <div className="profileimgBox">
            <img
            className="profileImg"
            src={`${profileData.memberResponse.memberImage.fileUrl}`}
            alt="profileimg"
            style={{ width: "150px" }}
            />
            </div>
            <div className="profileBox">
                <p className="usernickname">닉네임:{profileData.memberResponse.nickname}</p>
                <p className="userLV">LV:{profileData.memberStatusResponse.level}</p>
                <p className="usernewBee">초보자:{profileData.memberStatusResponse.newBee}</p>
                <p className="userpoint">포인트:{profileData.memberStatusResponse.point}</p>
                <div className="followContainer">
            </div>
            </div>
            </div>
            )}
            </div>
      );
}

export default Profile;