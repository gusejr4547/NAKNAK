import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { Button } from 'react-bootstrap';
import FollowerModal from './FollowerModal'


function Follower(props) {
    const [userData] = useRecoilState(loginuser);
    const [followerData, setFollowerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accesstoken] = useRecoilState(token);
    const [isFollowing, setIsFollowing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const getFllowing = async () => {
        try {
            const response = await axios.get(`/api/members/following/${props.user}`);
            setFollowerData(response.data);
            const followingList = response.data.data.map((item) => item.memberId);
            console.log(followingList, userData.memberId)
            setIsFollowing(followingList.includes(userData.memberId));
            console.log(isFollowing)
            setLoading(false); // 데이터 로딩 완료
        } catch (error) {
            console.error("Error getting data:", error);
            setLoading(false); // 데이터 로딩 실패
        }
    };

    useEffect(() => {
        getFllowing();
    }, [props.user]);

    const header = useMemo(() => ({
        Authorization: accesstoken,
      }), [accesstoken]);
    
  const followUser = async () => {
    if (props.user === userData.memberId) {
      console.log('동일')
      return
    }

    const param = { follow: props.user };
    const config = {params:param, headers:header}
    try {
      const response = await axios.post("/api/follow/register", null, config);
      console.log(response, 456);
      getFllowing()
    } catch (error) {
      console.error('Error posting data:', error);
    }

  };
  const unFollowUser = async () => {
    if (props.user === userData.memberId) {
      console.log('동일')
      return
    }
    const param = { follow: props.user };
    const config = {params:param, headers:header}
    try {
      const response = await axios.post("/api/follow/cancel", null, config);
      console.log(response, 456);
      getFllowing()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };




    if (loading) {
        return <div>팔로워: </div>;
    }

    if (!followerData) {
        return <div>Failed to load data.</div>;
    }

    return (
        <div>
            <p onClick={showModal}>팔로워: {followerData.count}</p>
            {modalOpen && <FollowerModal closeModal={setModalOpen} data={followerData.data} />}
            {props.user !== userData.memberId && !isFollowing && (
                <Button
                    as="input"
                    type="button"
                    value="팔로우"
                    style={{ margin: '10px 0px 0px 0px' }}
                    onClick={followUser}
                />
                )}
            {props.user !== userData.memberId && isFollowing && (
                <Button
                    as="input"
                    type="button"
                    value="언팔로우"
                    style={{ margin: '10px 0px 0px 0px',  backgroundColor: "red", }}
                    onClick={unFollowUser}
                />
                )}
                
            
        </div>
        
    );
}

export default Follower;

