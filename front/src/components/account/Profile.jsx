import React, {useEffect, useState, useMemo } from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { Button } from 'react-bootstrap';
import Following from './Following';
import Follower from './Follower';
import { useParams } from 'react-router-dom';
import { authorizedRequest } from './AxiosInterceptor';



function Profile(props) {
    const userId = useParams().userId;
    console.log(userId.slice(1))
    const temp = userId.slice(1)
    console.log(temp)
    const [userData ] = useRecoilState(loginuser);
    const [accesstoken ] = useRecoilState(token);
    const [profileData, setProfileData] = useState(null);
    // console.log(accesstoken)
    // const acctoken = localStorage.getItem("key")

    const header = useMemo(() => ({
      Authorization: accesstoken,
    }), [accesstoken]);
    
    useEffect(() => {
        const getUser = async () => {
          try {
            console.log(header)
            const response = await authorizedRequest({ method: 'get', url: `/api/members/${temp}` });

            // const response = await authorizedRequest(`/members/${temp}`);
            setProfileData(response.data);
            console.log(profileData, 123);
            console.log(response.data, 456);
          } catch (error) {
            console.error("Error posting data:", error);
          }
        };
        getUser();
      }, [header, profileData, temp]
);

  const followingUser = async () => {
    console.log(profileData.memberResponse.memberId, userData.memberId)
    if (profileData.memberResponse.memberId === userData.memberId) {
      console.log('동일')
      return
    }
    const param = { follow: profileData.memberResponse.memberId };
    const config = {params:param, headers:header}
    try {
      const response = await axios.post("/api/follow/register", null, config);
      console.log(response, 456);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };




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
                <p className="usernickname">닉네임:{profileData.memberResponse.nickname}</p>
                <p className="userLV">LV:{profileData.memberStatusResponse.level}</p>
                <p className="usernewBee">초보자:{profileData.memberStatusResponse.newBee? 'O' : 'X'}</p>
                <p className="userpoint">포인트:{profileData.memberStatusResponse.point}</p>
                
                
                
              
              <div className="followContainer">  
              <Following/>
              <Follower/>
                {profileData.memberResponse.memberId !== userData.memberId && (
                <Button
                  as="input"
                  type="button"
                  value="팔로우"
                  style={{ margin: '10px 0px 0px 0px' }}
                  onClick={followingUser}
                />
                )}

            </div>



            </div>
            </div>
            )}
            </div>
      );
}

export default Profile;